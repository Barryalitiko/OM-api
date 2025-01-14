const winston = require('winston');

// Configuración del logger
const logger = winston.createLogger({
  level: 'info', // El nivel de log que queremos
  format: winston.format.combine(
    winston.format.timestamp(), // Agregar la marca de tiempo
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} ${level}: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(), // Imprimir los logs en la consola
    new winston.transports.File({ filename: 'api.log' }) // Guardar los logs en el archivo api.log
  ]
});

module.exports = logger;