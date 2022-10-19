const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const sequelize = require('./util/database');
const Product = require('./models/product');
const User = require('./models/user');

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

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

//Product has a one-one relationship with product
Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);

//it compares all the modules from the models and creates tables in mysql
//CREATE IF NOT EXISTS
//also adds a createdAt and updatedAt by default
//can be disabled
sequelize
  .sync({ force: true })
  .then((result) => {
    // console.log(result);
  })
  .catch((err) => console.log(err));

app.listen(3000);
