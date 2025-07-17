import { AuthGuard } from '@common/guards/auth.guard';
import { Controller, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ProjectDocumentService } from './project-document.service';

@ApiTags('Project-document')
@Controller('project-document')
@UseGuards(AuthGuard)
@ApiBearerAuth()
@UsePipes(new ValidationPipe({ transform: true }))
export class ProjectDocumentController {
  constructor(private readonly projectDocumentService: ProjectDocumentService) {}
}
