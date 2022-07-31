//adding a file system for storing and retrieveing data
const fs = require('fs');
const path = require('path');
const p = path.join(
  path.dirname(require.main.filename),
  'data',
  'products.json'
);
const getProductsfromFile = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      return cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(title, imageUrl, decription, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.decription = decription;
    this.price = price;
  }
  save() {
    //path you want to store
    getProductsfromFile((products) => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (err) => {
        console.log(err);
      });
    });
  }

  //json.parse is async
  static fetchAll(cb) {
    getProductsfromFile(cb);
  }
};
