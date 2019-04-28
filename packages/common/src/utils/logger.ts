import * as winston from 'winston';

const { combine, timestamp, printf } = winston.format;
const myFormat = printf(info => {
  if (info instanceof Error) {
    return `${info.timestamp}  ${info.level}: ${info.message} ${info.stack}`;
  }
  return `${info.timestamp}  ${info.level}: ${info.message} ${info.stack}`;
});

export const logger : winston.Logger = winston.createLogger({
  format: combine(
    winston.format.splat(),
    winston.format.colorize(),
    timestamp(),
    myFormat,
  ),
  transports: [
    new winston.transports.Console({
      level: 'debug',
      handleExceptions: true,
    }),
  ],
  exitOnError: false,
});