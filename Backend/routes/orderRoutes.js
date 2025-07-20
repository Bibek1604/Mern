const express = require('express');
const router = express.Router();
const controller = require('../controller/orderController');
// const auth = require('../middleware/authMiddleware'); // Removed for now

// router.use(auth); // Removed protection for now
router.post('/', controller.placeOrder);
router.get('/get', controller.getOrders);
router.get('/admin', controller.getAllOrders);  // Use frontend check for admin only
router.put('/:id', controller.updateOrderStatus);

module.exports = router;