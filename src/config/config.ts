import * as dotenv from 'dotenv';

dotenv.config();

export const Config = {
  PORT: process.env.PORT || 1432,
  JWT_SECRET: process.env.JWT_SECRET,
  ACCESS_TOKEN_EXPIRED_TIME: '1d',
  REFRESH_TOKEN_EXPIRED_TIME: '8d',
  DATABASE: {
    DATABASE_HOST: process.env.DATABASE_HOST || 'localhost',
    DATABASE_PORT: +process.env.DATABASE_PORT
      ? Number(+process.env.DATABASE_PORT)
      : +process.env.DATABASE_PORT || 3606,
    DATABASE_USER: process.env.DATABASE_USER || '',
    DATABASE_PASSWORD: process.env.DATABASE_PASSWORD || '',
    DATABASE_NAME: process.env.DATABASE_NAME || 'redeermer',
  },
};
