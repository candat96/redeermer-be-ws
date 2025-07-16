import { Module } from '@nestjs/common';
import { ProjectTagController } from './project-tag.controller';
import { ProjectTagService } from './project-tag.service';

@Module({
  controllers: [ProjectTagController],
  providers: [ProjectTagService],
})
export class ProjectTagModule {}
