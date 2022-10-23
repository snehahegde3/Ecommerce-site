const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const sequelize = require('./util/database');
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

// db.execute('SELECT * FROM products')
//   .then((result) => {
//     console.log(result[0]);
//   })
//   .catch((err) => console.log(err));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//this is the middle that runs on incoming requests
//so this just registers a middleware
//only runs on incoming requests after the server has successfully started

app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      //here, user is not just a javascript object but
      //a sequalize object with methods from sequalize to destroy and more such
      req.user = user;
      next();
    })
    .catch();
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

//Product has a one-one relationship with product
Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

//it compares all the modules from the models and creates tables in mysql
//CREATE IF NOT EXISTS
//also adds a createdAt and updatedAt by default
//can be disabled

//npm start runs the sequalize part
sequelize
  .sync()
  .then((result) => {
    return User.findByPk(1);
    // console.log(result);
  })
  .then((user) => {
    if (!user) {
      return User.create({ name: 'Sne', email: 'sne@mail.com' });
    }
    return user;
  })
  .then((user) => {
    return user.createCart();
  })
  .then(app.listen(3000))
  .catch((err) => console.log(err));
