import { AuthenticationController } from '@modules/authentication/authentication.controller';
import { AuthenticationService } from '@modules/authentication/authentication.service';
import { JwtStrategyHelper } from '@modules/authentication/helpers/jwt-strategy.helper';
import { UserEntity } from '@modules/database/entities/user.entity';
import { EmailModule } from '@modules/email/email.module';
import { UserModule } from '@modules/user/user.module';
import { WhitelistEmailModule } from '@modules/whitelist-email/whitelist-email.module';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    EmailModule,
    JwtModule,
    UserModule,
    WhitelistEmailModule,
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, JwtStrategyHelper],
  exports: [AuthenticationService],
})
export class AuthenticationModule {}
