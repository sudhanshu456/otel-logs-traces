const Joi = require('joi');

const addItemSchema = Joi.object({
    productId: Joi.string().required(),
    quantity: Joi.number().integer().min(1).required()
});

const orderSchema = Joi.object({
    userId: Joi.string().required(),
    productIds: Joi.array().items(Joi.string().required()).min(1).required()
});

module.exports = { addItemSchema, orderSchema };
