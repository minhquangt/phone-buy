const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products');

router.get('/search', productsController.searchProduct);
router.get('/', productsController.getAllProducts);
router.get('/:id', productsController.getSingleProducts);

module.exports = router;