const orderService = require('../services/orderService');
const logger = require('../../logger');

exports.getUser = async (req, res) => {
    res.json({ id: req.params.id, name: "John Doe" });
};

exports.placeOrder = async (req, res) => {
    try {
        logger.info('Calling orderService to place order')
        const result = await orderService.placeOrder(req.params.id, req.body.productIds);
        res.json(result);
    } catch (error) {
        logger.error('Error occured while calling orderService')
        logger.error(error);
        res.status(500).json({ error: error.message });
    }
};
