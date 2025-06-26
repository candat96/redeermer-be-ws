import { ErrorCode } from '@common/constants/error.constant';
import {
  RefreshTokenDataDto,
  RefreshTokenPayloadDto,
} from '@common/guards/auth.guard';
import { Config } from '@config/config';
import { GenerateTokenDto } from '@modules/authentication/dto/login.dto';
import { UserEntity } from '@modules/database/entities/user.entity';
import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as _ from 'lodash';

@Injectable()
export class JwtStrategyHelper {
  constructor(private readonly jwtService: JwtService) {}

  generateToken(user: UserEntity): GenerateTokenDto {
    const accessToken = this.jwtService.sign(
      {
        user: _.pick(user, ['id', 'name', 'avatar', 'email', 'role', 'status']),
      },
      {
        secret: Config.JWT_SECRET,
        expiresIn: Config.ACCESS_TOKEN_EXPIRED_TIME,
      },
    );

    const refreshToken = this.jwtService.sign(
      {
        user: _.pick(user, ['id']),
      },
      {
        secret: Config.JWT_SECRET,
        expiresIn: Config.REFRESH_TOKEN_EXPIRED_TIME,
      },
    );

    return { accessToken, refreshToken };
  }

  async verifyRefreshToken(token: string): Promise<RefreshTokenDataDto> {
    const payload: RefreshTokenPayloadDto = await this.jwtService.verifyAsync(
      token,
      {
        secret: Config.JWT_SECRET,
      },
    );

    const now = Date.now();
    if (payload.exp * 1000 <= now) {
      throw new BadRequestException(ErrorCode.TOKEN_EXPIRED);
    }

    if (!payload?.user?.id) {
      throw new BadRequestException(ErrorCode.INVALID_REFRESH_TOKEN);
    }

    return payload.user;
  }
}
