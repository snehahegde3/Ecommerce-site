const mysql = require('mysql');

//pool to be able to run multiple queries at the same time
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'ecommerce-site',
  password: '12345',
});

module.exports = pool.promise();
