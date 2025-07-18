import { ProjectDetailEntity } from '@modules/database/entities/project-detail.entity';
import { ProjectDocumentEntity } from '@modules/database/entities/project-document.entity';
import { ProjectEntity } from '@modules/database/entities/project.entity';
import { UserEntity } from '@modules/database/entities/user.entity';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectDocumentController } from './project-document.controller';
import { ProjectDocumentService } from './project-document.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      ProjectDocumentEntity,
      ProjectEntity,
      ProjectDetailEntity,
    ]),
    JwtModule,
  ],
  controllers: [ProjectDocumentController],
  providers: [ProjectDocumentService],
  exports: [ProjectDocumentService],
})
export class ProjectDocumentModule {}
