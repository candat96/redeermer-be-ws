import { PaginatedResponse } from '@common/classes/response.dto';
import { UserDocumentVerifyStatusEnum } from '@common/constants/enum/user-document.enum';
import { ErrorCode } from '@common/constants/error.constant';
import { UserDocumentEntity } from '@modules/database/entities/user-document.entity';
import { UserEntity } from '@modules/database/entities/user.entity';
import { CreateUserDocumentDto } from '@modules/user-document/dto/create-user-document.dto';
import { GetUserDocumentListDto } from '@modules/user-document/dto/get-list-user-document.dto';
import { GetUserDocumentResponseDto } from '@modules/user-document/dto/get-user-document.dto.';
import { VerifyUserDocumentDto } from '@modules/user-document/dto/verify-user-document.dto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserDocumentService {
  constructor(
    @InjectRepository(UserDocumentEntity)
    private readonly docRepo: Repository<UserDocumentEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}

  async getList(
    dto: GetUserDocumentListDto,
  ): Promise<PaginatedResponse<GetUserDocumentResponseDto>> {
    const qb = this.docRepo
      .createQueryBuilder('doc')
      .leftJoinAndSelect('doc.user', 'user');

    if (dto.status) {
      qb.andWhere('doc.status = :status', { status: dto.status });
    }

    if (dto.search) {
      qb.andWhere('(user.name ILIKE :search OR user.email ILIKE :search)', {
        search: `%${dto.search}%`,
      });
    }

    if (!dto.getAll) {
      qb.take(dto.limit ?? 10);
      qb.skip(dto.offset ?? 0);
    }

    qb.orderBy('doc.createdAt', 'DESC');

    const [data, total] = await qb.getManyAndCount();

    return new PaginatedResponse<GetUserDocumentResponseDto>(
      data.map((item) => new GetUserDocumentResponseDto(item)),
      {
        page: dto.page,
        limit: dto.limit,
        total,
      },
    );
  }

  async uploadDocument(userId: string, dto: CreateUserDocumentDto) {
    const user = await this.userRepo.findOneByOrFail({ id: userId });

    if (!user) {
      throw new BadRequestException(ErrorCode.USER_NOT_FOUND);
    }

    await this.docRepo.save(
      this.docRepo.create({
        ...dto,
        user,
      }),
    );

    return true;
  }

  async getMyDocuments(userId: string) {
    return this.docRepo.find({
      where: { user: { id: userId } },
      order: { createdAt: 'DESC' },
    });
  }

  async verifyDocument(
    documentId: string,
    dto: VerifyUserDocumentDto,
    adminId: string,
  ): Promise<boolean> {
    const doc = await this.docRepo.find({
      where: { id: documentId },
      relations: ['user'],
    });

    if (!doc) {
      throw new BadRequestException(ErrorCode.USER_DOCUMENT_NOT_FOUND);
    }
    await this.docRepo.save(
      this.docRepo.create({
        status: dto.status,
        note: dto.note || null,
        verifiedAt: new Date(),
        verifiedBy: this.userRepo.create({ id: adminId }),
      }),
    );

    return true;
  }

  async isUserVerified(userId: string): Promise<boolean> {
    const count = await this.docRepo.count({
      where: {
        user: { id: userId },
        status: UserDocumentVerifyStatusEnum.VERIFIED,
      },
    });
    return count > 0;
  }
}
