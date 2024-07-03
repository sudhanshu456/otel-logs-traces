const axios = require('axios');
const logger = require('../../logger');

const { orderSchema } = require('../models/orderModel');

const CART_SERVICE_ENDPOINT = 'http://localhost:3001';

exports.placeOrder = async (userId, productIds) => {
    const { error } = orderSchema.validate({ userId, productIds });
    if (error) {
        throw new Error(`Validation error: ${error.details.map(x => x.message).join(', ')}`);
    }
    try {
        logger.info(`Order placed for ${userId}, Product IDs: ${productIds}, Cart Service Endpoint: ${CART_SERVICE_ENDPOINT}`)
        const response = await axios.post(`${CART_SERVICE_ENDPOINT}/cart/order`, { userId, productIds });
        return response.data;
    } catch (error) {
        logger.error('Unable to place an order, cart service is not online')
        throw new Error("Order placement failed");
    }
};
