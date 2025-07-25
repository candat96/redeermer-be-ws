import { UserRole } from '@common/constants/enum/user.enum';
import { Reflector } from '@nestjs/core';

export const Roles = Reflector.createDecorator<UserRole[]>();
