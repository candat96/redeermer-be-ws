import { Controller } from '@nestjs/common';
import { ProjectDocumentService } from './project-document.service';

@Controller('project-document')
export class ProjectDocumentController {
  constructor(private readonly projectDocumentService: ProjectDocumentService) {}
}
