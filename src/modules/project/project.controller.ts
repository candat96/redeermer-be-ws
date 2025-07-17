import { CreateProjectDto } from '@modules/project/dto/create-project.dto';
import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProjectService } from './project.service';

@ApiTags('Project')
@Controller('project')
@UsePipes(new ValidationPipe({ transform: true }))
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  async createProject(@Body() dto: CreateProjectDto) {
    return this.projectService.createProject(dto);
  }
}
