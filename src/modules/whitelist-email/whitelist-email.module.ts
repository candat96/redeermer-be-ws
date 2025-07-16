import { WhitelistEmailEntity } from '@modules/database/entities/whitelist-email.entity';
import { WhitelistEmailController } from '@modules/whitelist-email/whitelist-email.controller';
import { WhitelistEmailService } from '@modules/whitelist-email/whitelist-email.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([WhitelistEmailEntity])],
  controllers: [WhitelistEmailController],
  providers: [WhitelistEmailService],
  exports: [WhitelistEmailService],
})
export class WhitelistEmailModule {}
