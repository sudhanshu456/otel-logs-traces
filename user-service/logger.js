const { createLogger, format, transports } = require('winston');

const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp(),
        format.json()
    ),
    defaultMeta: { service: 'user-service' },

    transports: [
        new transports.Console(),
        new transports.File({ filename: '/tmp/user-service.log' })
    ]
});

module.exports = logger;
