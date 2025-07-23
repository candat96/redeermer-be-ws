import { PaginatedResponse } from '@common/classes/response.dto';
import { ProjectDocumentVerifyStatusEnum } from '@common/constants/enum/project-document.enum';
import { ProjectFieldReviewEnum } from '@common/constants/enum/project-field-review.enum';
import { ProjectVerifiedStatus } from '@common/constants/enum/project.enum';
import { ErrorCode } from '@common/constants/error.constant';
import { ProjectDocumentEntity } from '@modules/database/entities/project-document.entity';
import { ProjectEntity } from '@modules/database/entities/project.entity';
import { ProjectFieldReviewEntity } from '@modules/database/entities/project_field_reviews.entity';
import { UserEntity } from '@modules/database/entities/user.entity';
import { ReviewProjectFeedbackDto } from '@modules/legal/dto/legal-review-multiple-field.dto';
import {
  FindAllProjectDto,
  FindAllProjectResponseDto,
} from '@modules/project/dto/find-all-project.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';

@Injectable()
export class LegalService {
  constructor(
    @InjectRepository(ProjectFieldReviewEntity)
    private readonly fieldReviewRepository: Repository<ProjectFieldReviewEntity>,
    @InjectRepository(ProjectEntity)
    private readonly projectRepository: Repository<ProjectEntity>,
  ) {}
  async reviewProjectFeedback(
    dto: ReviewProjectFeedbackDto,
    reviewerId: string,
  ): Promise<void> {
    await this.fieldReviewRepository.manager.transaction(async (manager) => {
      const project = await manager.findOne(ProjectEntity, {
        where: { id: dto.projectId },
      });

      if (!project) {
        throw new NotFoundException(ErrorCode.PROJECT_NOT_FOUND);
      }

      for (const { fieldName, status, comment } of dto.fieldReviews) {
        const fieldReview = await manager.findOne(ProjectFieldReviewEntity, {
          where: { project: { id: dto.projectId }, fieldName },
        });

        if (!fieldReview) {
          throw new NotFoundException(ErrorCode.FIELD_NAME_NOT_FOUND);
        }

        fieldReview.status = status;
        fieldReview.reviewerComment = comment || null;
        fieldReview.reviewer = { id: reviewerId } as UserEntity;

        await manager.save(ProjectFieldReviewEntity, fieldReview);
      }

      for (const { documentId, status, comment } of dto.documentReviews) {
        const doc = await manager.findOne(ProjectDocumentEntity, {
          where: { id: documentId, project: { id: dto.projectId } },
        });

        if (!doc) {
          throw new NotFoundException(ErrorCode.PROJECT_DOCUMENT_NOT_FOUND);
        }

        doc.status = status;
        doc.note = comment || null;
        doc.verifiedBy = { id: reviewerId } as any;
        doc.verifiedAt = new Date();

        await manager.save(ProjectDocumentEntity, doc);
      }

      const allFieldReviews = await manager.find(ProjectFieldReviewEntity, {
        where: { project: { id: dto.projectId } },
      });

      const allDocReviews = await manager.find(ProjectDocumentEntity, {
        where: { project: { id: dto.projectId } },
      });

      const allFieldsVerified = allFieldReviews.every(
        (f) => f.status === ProjectFieldReviewEnum.VERIFIED,
      );

      const allDocsVerified = allDocReviews.every(
        (d) => d.status === ProjectDocumentVerifyStatusEnum.VERIFIED,
      );

      if (allFieldsVerified && allDocsVerified) {
        await manager.update(ProjectEntity, dto.projectId, {
          verifiedStatus: ProjectVerifiedStatus.VERIFIED,
        });
      } else {
        await manager.update(ProjectEntity, dto.projectId, {
          verifiedStatus: ProjectVerifiedStatus.PENDING,
        });
      }
    });
  }

  async findAllProject(query: FindAllProjectDto) {
    const [data, total] = await this.projectRepository.findAndCount({
      where: {
        name: query.search ? ILike(`%${query.search}%`) : undefined,
        verifiedStatus: query.projectVerifiedStatus ?? undefined,
      },
      relations: {
        contactPerson: true,
        document: true,
        // fieldReviews: true
      },
      take: !query.getAll ? query.limit : undefined,
      skip: !query.getAll ? query.offset : undefined,
      order: { createdAt: query.order },
    });

    return new PaginatedResponse<FindAllProjectResponseDto>(
      data.map((item) => new FindAllProjectResponseDto(item)),
      {
        page: query.page,
        limit: query.limit,
        total: total,
      },
    );
  }
}
