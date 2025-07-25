import { UserRole, UserStatus } from '@common/constants/enum/user.enum';
import { UpdateMeDto } from '@modules/user/dto/update-me.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';

export class UpdateUserDto extends UpdateMeDto {
  @ApiProperty({
    type: UserRole,
    enum: UserRole,
    required: false,
    example: UserRole.USER,
    description: 'User role',
  })
  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;

  @ApiProperty({
    type: UserStatus,
    enum: UserStatus,
    required: false,
    example: UserStatus.ACTIVE,
    description: 'User status',
  })
  @IsEnum(UserStatus)
  @IsOptional()
  status?: UserStatus;
}
