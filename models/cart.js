const path = require('path');
const fs = require('fs');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'cart.json'
);

module.exports = class Cart {
  static addProduct(id, productPrice) {
    fs.readFile(p, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(fileContent);
      }
      const existingIndex = cart.products.findIndex((prod) => prod.id === id);
      const existingProduct = cart.products[existingIndex];
      let updatedProduct;
      if (existingProduct) {
        //if already exists
        updatedProduct = { ...existingProduct };
        updatedProduct.qty += 1;
        cart.products = [...cart.products];
        cart.products[existingIndex] = updatedProduct;
      } else {
        //new product
        //set id and qty
        updatedProduct = { id: id, qty: 1 };
        //add new product into the cart.products
        cart.products = [...cart.products, updatedProduct];
      }
      cart.totalPrice += +productPrice;
      fs.writeFile(p, JSON.stringify(cart), (err) => {
        console.log(err);
      });
    });
  }
};
