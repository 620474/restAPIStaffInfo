const winston = require('winston')
const expressWinston = require('express-winston')

const logger = expressWinston.logger({
    transports: [
        new winston.transports.File({
            filename: 'src/logs/server.log',
            format: winston.format.combine(
                winston.format.timestamp({format: 'MMM-DD-YYYY HH:mm:ss'}),
                winston.format.align(),
                winston.format.printf(info => {
                    return `${info.level}: ${[info.timestamp]}: ${info.message}`
                }),
            )
        })]
})

const errorLogger = expressWinston.errorLogger({
    transports: [
        new winston.transports.File({
            filename: 'src/logs/error.log',
            format: winston.format.combine(
                winston.format.timestamp({format: 'MMM-DD-YYYY HH:mm:ss'}),
                winston.format.align(),
                winston.format.printf(info => {
                    return `${info.level}: ${[info.timestamp]}: ${info.meta.error}`
                }),
            )
        })]
})

module.exports = {
    logger,
    errorLogger
};




