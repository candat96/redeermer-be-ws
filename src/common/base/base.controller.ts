import { Logger } from '@nestjs/common';

export abstract class BaseController {
  protected readonly logger: Logger;

  constructor(loggerName: string) {
    this.logger = new Logger(loggerName);
  }

  protected handleError(error: any, context: string): never {
    this.logger.error(`${context} failed`, error);
    throw error;
  }

  protected logSuccess(context: string, data?: any): void {
    this.logger.log(`${context} completed successfully`, data);
  }
}
