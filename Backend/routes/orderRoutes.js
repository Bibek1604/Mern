const express = require('express');
const router = express.Router();
const controller = require('../controller/orderController');

router.post('/', controller.placeOrder);
router.get('/get', controller.getOrders);
router.get('/admin', controller.getAllOrders); 
router.put('/:id', controller.updateOrderStatus);

module.exports = router;