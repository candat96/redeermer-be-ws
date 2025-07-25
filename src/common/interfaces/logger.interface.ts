export interface LogMessage {
  level: 'info' | 'debug' | 'warn' | 'error';
  message?: string;
  error?: any;
  key?: string;
  timestamp?: string;
}

export interface ApiLogMessage extends LogMessage {
  statusCode: number;
  method: string;
  originalUrl: string;
  statusMessage: string;
  ip: string;
  params: any;
  query: any;
  body: any;
  response: any;
  apiLogger: boolean;
}

export interface WinstonLogger {
  log(options: LogMessage | ApiLogMessage): void;
}
