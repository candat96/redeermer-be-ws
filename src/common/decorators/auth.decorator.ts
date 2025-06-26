import { AccessTokenDataDto } from '@common/guards/auth.guard';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Auth = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): AccessTokenDataDto => {
    const request = ctx.switchToHttp().getRequest();
    return request?.auth || {};
  },
);
