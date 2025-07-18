import { ErrorCode } from '@common/constants/error.constant';
import { ProjectDetailEntity } from '@modules/database/entities/project-detail.entity';
import { ProjectDocumentEntity } from '@modules/database/entities/project-document.entity';
import { ProjectEntity } from '@modules/database/entities/project.entity';
import { VerifyMultipleProjectDocumentsDto } from '@modules/project-document/dto/verify-multi-project-document.dto';
import { VerifyProjectDocumentDto } from '@modules/project-document/dto/verify-project-document.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
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

  async verifiedProjectDocument(
    documentId: string,
    dto: VerifyProjectDocumentDto,
    userId: string,
  ) {
    const document = await this.projectDocumentRepository.findOne({
      where: { id: documentId },
      relations: ['verifiedBy'],
    });

    if (!document) throw new NotFoundException(ErrorCode.PROJECT_DOCUMENT_NOT_FOUND);

    document.status = dto.status;
    document.note = dto.note ?? null;
    document.verifiedAt = new Date();
    document.verifiedBy = { id: userId } as any;

    await this.projectDocumentRepository.save(document);
    return true;
  }

  async verifyMultipleDocuments(
    dto: VerifyMultipleProjectDocumentsDto,
    userId: string,
  ): Promise<boolean> {
    const { documentIds, status, note } = dto;

    const documents = await this.projectDocumentRepository.findByIds(documentIds);

    if (!documents.length) throw new NotFoundException('No documents found');

    const now = new Date();

    for (const doc of documents) {
      doc.status = status;
      doc.note = note ?? null;
      doc.verifiedAt = now;
      doc.verifiedBy = { id: userId } as any;
    }

    await this.projectDocumentRepository.save(documents);
    return true;
  }
}
