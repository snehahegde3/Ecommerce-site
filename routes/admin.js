const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();

const adminController = require('../controllers/admin');
const { builtinModules } = require('module');

// /admin/add-product => GET
router.get('/add-product', adminController.getAddProduct);

router.get('/products', adminController.getProducts);

// /admin/add-product => POST
router.post('/add-product', adminController.postAddProduct);

module.exports = router;
