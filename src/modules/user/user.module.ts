import { UserEntity } from '@modules/database/entities/user.entity';
import { UserController } from '@modules/user/user.controller';
import { UserService } from '@modules/user/user.service';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), JwtModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
