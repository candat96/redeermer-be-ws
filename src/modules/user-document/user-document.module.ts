import { UserDocumentEntity } from '@modules/database/entities/user-document.entity';
import { UserEntity } from '@modules/database/entities/user.entity';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserDocumentController } from './user-document.controller';
import { UserDocumentService } from './user-document.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserDocumentEntity, UserEntity]), JwtModule],
  controllers: [UserDocumentController],
  providers: [UserDocumentService],
  exports: [UserDocumentService],
})
export class UserDocumentModule {}
