import { PaginatedResponse } from '@common/classes/response.dto';
import { UserRole, UserStatus } from '@common/constants/enum/user.enum';
import { ErrorCode } from '@common/constants/error.constant';
import { hashPassword } from '@modules/authentication/helpers/password.helper';
import { UserEntity } from '@modules/database/entities/user.entity';
import { CreateUserDto } from '@modules/user/dto/create-user.dto';
import {
  FindAllUserDto,
  FindAllUserResponseDto,
} from '@modules/user/dto/find-all-user.dto';
import { FindUserByIdResponseDto } from '@modules/user/dto/find-user-by-id.dto';
import { UpdateMeDto } from '@modules/user/dto/update-me.dto';
import { UpdateUserDto } from '@modules/user/dto/update-user.dto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Not, Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findByEmail(email: string) {
    return await this.userRepository.findOneBy({ email });
  }

  async findAll(
    query: FindAllUserDto,
  ): Promise<PaginatedResponse<FindAllUserResponseDto>> {
    const [data, total] = await this.userRepository.findAndCount({
      where: {
        name: query.search ? ILike(`%${query.search}%`) : undefined,
        gender: query.gender,
        status: query.status,
        role: query.role,
      },
      take: !query.getAll ? query.limit : undefined,
      skip: !query.getAll ? query.offset : undefined,
      order: { createdAt: query.order },
    });

    return new PaginatedResponse<FindAllUserResponseDto>(
      data.map((item) => new FindAllUserResponseDto(item)),
      {
        page: query.page,
        limit: query.limit,
        total,
      },
    );
  }

  async findOne(id: string): Promise<FindUserByIdResponseDto> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      return null;
    }

    return new FindUserByIdResponseDto(user);
  }

  async findMe(id: string): Promise<FindUserByIdResponseDto> {
    return this.findOne(id);
  }

  async create(dto: CreateUserDto): Promise<boolean> {
    const existedEmail = await this.findByEmail(dto.email);
    if (existedEmail) {
      throw new BadRequestException(ErrorCode.EMAIL_HAS_BEEN_USED);
    }

    const hashed = await hashPassword(dto.password);

    await this.userRepository.insert(
      this.userRepository.create({
        email: dto.email,
        password: hashed,
        name: dto.name,
        birthday: dto.birthday,
        avatar: dto.avatar,
        background: dto.background,
        gender: dto.gender,
        role: UserRole.CUSTOMER,
        status: UserStatus.ACTIVE,
      }),
    );

    return true;
  }

  async update(id: string, dto: UpdateUserDto): Promise<boolean> {
    const user = this.findOne(id);
    if (!user) {
      throw new BadRequestException(ErrorCode.USER_NOT_FOUND);
    }

    if (dto.email) {
      const existedEmail = await this.userRepository.findOneBy({
        id: Not(id),
        email: dto.email,
      });
      if (existedEmail) {
        throw new BadRequestException(ErrorCode.EMAIL_HAS_BEEN_USED);
      }
    }

    await this.userRepository.update(
      id,
      this.userRepository.create({
        email: dto.email,
        password: dto.password ? await hashPassword(dto.password) : undefined,
        name: dto.name,
        birthday: dto.birthday,
        avatar: dto.avatar,
        background: dto.background,
        gender: dto.gender,
        role: dto.role,
        status: dto.status,
      }),
    );

    return true;
  }

  async updateMe(id: string, dto: UpdateMeDto): Promise<FindUserByIdResponseDto> {
    await this.update(id, dto);
    return await this.findMe(id);
  }

  async delete(id: string): Promise<boolean> {
    const user = this.findOne(id);
    if (!user) {
      throw new BadRequestException(ErrorCode.USER_NOT_FOUND);
    }

    await this.userRepository.softDelete(id);

    return true;
  }
}
