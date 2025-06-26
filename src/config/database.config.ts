import { UserEntity } from '@modules/database/entities/user.entity';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Config } from './config';

export const DatabaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: Config.DATABASE.DATABASE_HOST,
  port: Config.DATABASE.DATABASE_PORT,
  username: Config.DATABASE.DATABASE_USER,
  password: Config.DATABASE.DATABASE_PASSWORD,
  database: Config.DATABASE.DATABASE_NAME,
  synchronize: true,
  autoLoadEntities: true,
  logging: false,
  entities: [UserEntity],
};
