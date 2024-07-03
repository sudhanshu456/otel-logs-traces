const Joi = require('joi');

const orderSchema = Joi.object({
    userId: Joi.string().required(),
    productIds: Joi.array().items(Joi.string().required()).min(1).required()
});

module.exports = { orderSchema };
