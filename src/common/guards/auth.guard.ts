import { AppConstants } from '@common/constants/app.constant';
import { UserRole } from '@common/constants/enum/user.enum';
import { ErrorCode } from '@common/constants/error.constant';
import { Config } from '@config/config';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export class AccessTokenDataDto {
  id: string;
  name: string;
  avatar: string;
  role: UserRole;
}

export class AccessTokenPayloadDto {
  user: AccessTokenDataDto;
  iat: number;
  exp: number;
}

export class RefreshTokenDataDto {
  id: string;
}

export class RefreshTokenPayloadDto {
  user: RefreshTokenDataDto;
  iat: number;
  exp: number;
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException(ErrorCode.UNAUTHORIZED);
    }

    try {
      const { user }: AccessTokenPayloadDto = await this.jwtService.verifyAsync(
        token,
        {
          secret: Config.JWT_SECRET,
        },
      );

      if (!user?.id || !user?.role) {
        throw new UnauthorizedException(ErrorCode.INVALID_ACCESS_TOKEN);
      }

      request['auth'] = user;

      return true;
    } catch {
      throw new UnauthorizedException(ErrorCode.INVALID_ACCESS_TOKEN);
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] =
      request.headers?.[AppConstants.AUTH_HEADERS_KEY]?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
