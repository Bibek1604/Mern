const express = require('express');
const router = express.Router();
const controller = require('../controller/cartController');
// const auth = require('../middleware/authMiddleware'); // Removed for now

// router.use(auth); // Removed protection for now
router.post('/', controller.addToCart);
router.get('/', controller.getCart);
router.put('/:id', controller.updateCartItem);
router.delete('/:id', controller.removeCartItem);

module.exports = router;