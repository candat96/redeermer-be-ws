import { Controller } from '@nestjs/common';
import { ProjectTagService } from './project-tag.service';

@Controller('project-tag')
export class ProjectTagController {
  constructor(private readonly projectTagService: ProjectTagService) {}
}
