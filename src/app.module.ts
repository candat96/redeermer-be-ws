import { WinstonLoggerService } from '@common/services/winston.service';
import { Config } from '@config/config';
import { ApiLoggerMiddleware } from '@middlewares/logger.middleware';
import { AuthenticationModule } from '@modules/authentication/authentication.module';
import { DatabaseModule } from '@modules/database/database.module';
import { UserModule } from '@modules/user/user.module';
import { WhitelistEmailModule } from '@modules/whitelist-email/whitelist-email.module';
import { CacheModule } from '@nestjs/cache-manager';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from './app.controller';

@Module({
  imports: [
    JwtModule.register({
      secret: Config.JWT_SECRET,
      signOptions: { expiresIn: '120s' },
    }),
    AuthenticationModule,
    DatabaseModule,
    CacheModule.register({
      isGlobal: true,
    }),
    UserModule,
    WhitelistEmailModule,
  ],
  controllers: [AppController],
  providers: [WinstonLoggerService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(ApiLoggerMiddleware).forRoutes('*');
  }
}
