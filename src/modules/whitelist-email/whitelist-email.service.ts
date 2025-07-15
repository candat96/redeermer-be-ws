import { ErrorCode } from '@common/constants/error.constant';
import { WhitelistEmailEntity } from '@modules/database/entities/whitelist-email.entity';
import { AddWhitelistEmailDto } from '@modules/whitelist-email/dto/add-whitelist-email.dto';
import { DeleteWhitelistEmailDto } from '@modules/whitelist-email/dto/delete-whitelist.dto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class WhitelistEmailService {
  constructor(
    @InjectRepository(WhitelistEmailEntity)
    private readonly whitelistEmailRepository: Repository<WhitelistEmailEntity>,
  ) {}

  async add(dto: AddWhitelistEmailDto): Promise<boolean> {
    const existed = await this.whitelistEmailRepository.findOneBy({
      email: dto.email,
    });
    if (existed) {
      return true;
    }

    await this.whitelistEmailRepository.save(
      this.whitelistEmailRepository.create({ email: dto.email }),
    );

    return true;
  }

  async delete(dto: DeleteWhitelistEmailDto): Promise<boolean> {
    const existed = await this.whitelistEmailRepository.findOneBy({
      email: dto.email,
    });
    if (!existed) {
      throw new BadRequestException(ErrorCode.EMAIL_IS_NOT_IN_WHITELIST);
    }

    await this.whitelistEmailRepository.softDelete(existed.id);

    return true;
  }

  async checkWhitelistEmail(email: string): Promise<boolean> {
    return !!(await this.whitelistEmailRepository.findOneBy({ email: email }));
  }
}
