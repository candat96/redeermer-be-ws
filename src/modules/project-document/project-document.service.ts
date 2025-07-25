import { PaginatedResponse } from '@common/classes/response.dto';
import { ErrorCode } from '@common/constants/error.constant';
import { ProjectDocumentEntity } from '@modules/database/entities/project-document.entity';
import { UserEntity } from '@modules/database/entities/user.entity';
import {
  GetProjectDocumentDto,
  GetProjectDocumentResponse,
} from '@modules/project-document/dto/get-project-document.dto';
import { VerifyMultipleProjectDocumentsDto } from '@modules/project-document/dto/verify-multi-project-document.dto';
import { VerifyProjectDocumentDto } from '@modules/project-document/dto/verify-project-document.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, In, Repository } from 'typeorm';

@Injectable()
export class ProjectDocumentService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(ProjectDocumentEntity)
    private readonly projectDocumentRepository: Repository<ProjectDocumentEntity>,
  ) {}

  async getProjectDocument(
    query: GetProjectDocumentDto,
  ): Promise<PaginatedResponse<GetProjectDocumentResponse>> {
    const [data, total] = await this.projectDocumentRepository.findAndCount({
      where: {
        fileName: query.search ? ILike(`%${query.search}%`) : undefined,
      },
      relations: { project: true },
      take: !query.getAll ? query.limit : undefined,
      skip: !query.getAll ? query.offset : undefined,
    });

    return new PaginatedResponse<GetProjectDocumentResponse>(
      data.map((item) => new GetProjectDocumentResponse(item)),
      {
        page: query.page,
        limit: query.limit,
        total,
      },
    );
  }

  async verifiedProjectDocument(
    documentId: string,
    dto: VerifyProjectDocumentDto,
    userId: string,
  ): Promise<boolean> {
    const document = await this.projectDocumentRepository.findOne({
      where: { id: documentId },
      relations: ['verifiedBy'],
    });

    if (!document) throw new NotFoundException(ErrorCode.PROJECT_DOCUMENT_NOT_FOUND);

    await this.projectDocumentRepository.update(documentId, {
      status: dto.status,
      note: dto.note ?? null,
      verifiedAt: new Date(),
      verifiedBy: this.userRepository.create({ id: userId }),
    });
    return true;
  }

  async verifyMultipleDocuments(
    dto: VerifyMultipleProjectDocumentsDto,
    userId: string,
  ): Promise<boolean> {
    const { documentIds, status, note } = dto;

    await this.projectDocumentRepository.manager.transaction(async (manager) => {
      const documents = await manager.find(ProjectDocumentEntity, {
        where: {
          id: In(documentIds),
        },
      });

      if (!documents.length) {
        throw new NotFoundException(ErrorCode.PROJECT_DOCUMENT_NOT_FOUND);
      }

      const now = new Date();

      for (const doc of documents) {
        await manager.update(ProjectDocumentEntity, doc.id, {
          status,
          note: note ?? null,
          verifiedAt: now,
          verifiedBy: this.userRepository.create({ id: userId }),
        });
      }
    });

    return true;
  }
}
