const express = require('express');
const router = express.Router();
const controller = require('../controller/productController');

router.get('/all', controller.getAllProducts);
router.get('/all/:id', controller.getProductById);
router.post('/add', controller.createProduct);
router.put('/update/:id', controller.updateProduct);
router.delete('/delete/:id', controller.deleteProduct);

module.exports = router;
