import { UserRole, UserStatus } from '@common/constants/enum/user.enum';
import * as bcrypt from 'bcrypt';

export const userData = [
  {
    email: 'admin@redeemer.io',
    password: bcrypt.hashSync('123456', 10),
    role: UserRole.ADMIN,
    status: UserStatus.ACTIVE,
    name: 'Admin Redeemer',
  },
];
