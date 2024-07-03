
const { addItemSchema, orderSchema } = require('../models/cartItemModel');
const logger = require('../../logger');

// Simple in-memory cart storage
let carts = {};

exports.getCart = (req, res) => {
    const userId = req.params.userId;
    const cart = carts[userId] || [];
    res.json({ userId, cart });
};

exports.addItemToCart = async (req, res) => {
    const { error } = addItemSchema.validate(req.body);
    if (error) {
        logger.error(error)
        return res.status(400).json({ error: error.details.map(x => x.message).join(', ') });
    }
    
    const { productId, quantity } = req.body;
    const userId = req.params.userId;
    if (!carts[userId]) {
        carts[userId] = [];
    }
    // Fake Delay    
    logger.warn('Faking request delay for 5000ms')
    await new Promise(resolve => setTimeout(resolve, 5000));

    carts[userId].push({ productId, quantity });
    logger.info(`${productId} with quanity ${quantity} added to ${userId} user cart`)
    res.json({ status: "success", message: `Product added to cart for user ${userId}` });
};

exports.placeOrder = (req, res) => {
    const { error } = orderSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details.map(x => x.message).join(', ') });
    }

    const { userId, productIds } = req.body;
    logger.info(`Order placed for user ${userId} with products ${productIds.join(", ")}`);
    res.json({ status: "success", message: `Order processed for user ${userId}` });
};
