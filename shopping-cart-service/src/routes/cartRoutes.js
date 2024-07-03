const express = require('express');
const cartController = require('../controllers/cartController');

const router = express.Router();
router.get('/:userId', cartController.getCart);
router.post('/:userId/items', cartController.addItemToCart);
router.post('/order', cartController.placeOrder);

module.exports = router;
