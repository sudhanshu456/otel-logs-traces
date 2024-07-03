const { createLogger, format, transports } = require('winston');

const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp(),
        format.json()
    ),
    defaultMeta: { service: 'shopping-cart-service' },

    transports: [
        new transports.Console(),
        new transports.File({ filename: '/tmp/shopping-cart-service.log' })
    ]
});

module.exports = logger;
