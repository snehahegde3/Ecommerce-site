// const path = require('path');
// const fs = require('fs');

// const p = path.join(path.dirname(require.main.filename), 'data', 'cart.json');

// module.exports = class Cart {
//   static addProduct(id, productPrice) {
//     fs.readFile(p, (err, fileContent) => {
//       let cart = { products: [], totalPrice: 0 };
//       if (!err) {
//         cart = JSON.parse(fileContent);
//       }
//       const existingIndex = cart.products.findIndex((prod) => prod.id === id);
//       const existingProduct = cart.products[existingIndex];
//       let updatedProduct;
//       if (existingProduct) {
//         //if already exists
//         updatedProduct = { ...existingProduct };
//         updatedProduct.qty += 1;
//         cart.products = [...cart.products];
//         cart.products[existingIndex] = updatedProduct;
//       } else {
//         //new product
//         //set id and qty
//         updatedProduct = { id: id, qty: 1 };
//         //add new product into the cart.products
//         cart.products = [...cart.products, updatedProduct];
//       }
//       cart.totalPrice += +productPrice;
//       fs.writeFile(p, JSON.stringify(cart), (err) => {
//         console.log(err);
//       });
//     });
//   }

//   static deleteProduct(id, productPrice) {
//     fs.readFile(p, (err, fileContent) => {
//       if (err) {
//         return;
//       }
//       const updatedCart = { ...JSON.parse(fileContent) };
//       const product = updatedCart.products.find((prod) => prod.id === id);
//       if (!product) {
//         return;
//       }
//       const productQty = product.qty;
//       updatedCart.products = updatedCart.products.filter(
//         (prod) => prod.id !== id
//       );
//       updatedCart.totalPrice -= productPrice * productQty;
//       fs.writeFile(p, JSON.stringify(updatedCart), (err) => {
//         console.log(err);
//       });
//     });
//   }

//   static getCart(cb) {
//     fs.readFile(p, (err, fileContent) => {
//       const cart = JSON.parse(fileContent);
//       if (err) {
//         cb(null);
//       } else {
//         cb(cart);
//       }
//     });
//   }
// };

const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Cart = sequelize.define('cart', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
});

module.exports = Cart;
