import { Roles } from '@common/decorators/roles.decorator';
import { AccessTokenDataDto } from '@common/guards/auth.guard';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get(Roles, context.getHandler());
    if (!roles) return true;
    const request = context.switchToHttp().getRequest();
    const auth: AccessTokenDataDto = request.auth;

    return auth ? roles.includes(auth.role) : false;
  }
}
