import { ApiLogMessage, LogMessage } from '@common/interfaces/logger.interface';
import { Injectable, LoggerService } from '@nestjs/common';
import { consoleLoggerTransport } from '@src/config/logger.config';
import winston from 'winston';

@Injectable()
export class WinstonLoggerService implements LoggerService {
  private winston: winston.Logger;

  constructor() {
    this.winston = winston.createLogger({
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp({
          format: 'MM/DD/YYYY, h:mm:ss A',
        }),
        winston.format.printf(({ timestamp, level, message }) => {
          return `[${level.toLocaleUpperCase()}] ${timestamp}: ${message}`;
        }),
      ),
      transports: [consoleLoggerTransport],
    });
  }

  apiLog(message: ApiLogMessage): void {
    this.winston.log({
      level: 'info',
      message: `API ${message.method} ${message.originalUrl} - ${message.statusCode}`,
      statusCode: message.statusCode,
      method: message.method,
      originalUrl: message.originalUrl,
      statusMessage: message.statusMessage,
      ip: message.ip,
      params: message.params,
      query: message.query,
      body: message.body,
      response: message.response,
      apiLogger: true,
    });
  }

  log(message: string | LogMessage, key?: string): void {
    if (typeof message === 'string') {
      this.winston.log({
        level: 'info',
        message,
        key,
      });
    } else {
      this.winston.log({
        level: 'info',
        message: message.message || 'Log message',
        ...message,
      });
    }
  }

  info(message: string | LogMessage, key?: string): void {
    if (typeof message === 'string') {
      this.winston.log({
        level: 'info',
        message,
        key,
      });
    } else {
      this.winston.log({
        level: 'info',
        message: message.message || 'Info message',
        ...message,
      });
    }
  }

  debug(message: string | LogMessage, key?: string): void {
    if (typeof message === 'string') {
      this.winston.log({
        level: 'debug',
        message,
        key,
      });
    } else {
      this.winston.log({
        level: 'debug',
        message: message.message || 'Debug message',
        ...message,
      });
    }
  }

  error(error: string | Error | LogMessage, key?: string): void {
    if (typeof error === 'string') {
      this.winston.log({
        level: 'error',
        message: error,
        key,
      });
    } else if (error instanceof Error) {
      this.winston.log({
        level: 'error',
        message: error.message,
        error: error.stack,
        key,
      });
    } else {
      this.winston.log({
        level: 'error',
        message: error.message || 'Error occurred',
        ...error,
      });
    }
  }

  warn(message: string | LogMessage, key?: string): void {
    if (typeof message === 'string') {
      this.winston.log({
        level: 'warn',
        message,
        key,
      });
    } else {
      this.winston.log({
        level: 'warn',
        message: message.message || 'Warning message',
        ...message,
      });
    }
  }
}
