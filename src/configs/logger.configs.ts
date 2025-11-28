import { createLogger, format, transports } from 'winston';

const { printf, timestamp, combine, json, colorize } = format;

const loggerFormat = printf(({ timestamp, message, level }) => {
  return `${timestamp} ${level} ${message}`;
});

const logger = createLogger({
  level: 'info',
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    colorize(),
    json(),
    loggerFormat
  ),
  transports: [
    new transports.Console(),
  ],
});

export default logger;
