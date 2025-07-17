import { ProjectDetailEntity } from '@modules/database/entities/project-detail.entity';
import { ProjectDocumentEntity } from '@modules/database/entities/project-document.entity';
import { ProjectEntity } from '@modules/database/entities/project.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProjectDocumentService {
  constructor(
    @InjectRepository(ProjectEntity)
    private readonly projectRepository: Repository<ProjectEntity>,
    @InjectRepository(ProjectDetailEntity)
    private readonly projectDetailRepository: Repository<ProjectDetailEntity>,
    @InjectRepository(ProjectDocumentEntity)
    private readonly projectDocumentRepository: Repository<ProjectDocumentEntity>,
  ) {}

  async getProjectDocument(query: any) {
    console.log(query);
    return await this.projectDocumentRepository.find();
  }
}
