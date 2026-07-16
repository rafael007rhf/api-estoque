import winston, { format } from 'winston';
import path from 'path';

const currentDir = import.meta.dirname;

const logger = winston.createLogger({
  level: 'info',
  format: format.combine(
    format.errors({ stack: true }), 
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.json()
  ),
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.File({ filename: path.join(currentDir, '..', 'storage', 'error.log'), level: 'error' }),
    new winston.transports.File({ filename: path.join(currentDir, '..', 'storage', 'combined.log') }),
  ],
});

function logMiddleware(req, res, next) {
  logger.info({
    method: req.method, url: req.url
  });
  next();
};

export default logMiddleware;
