import { PageRequestDto } from '@common/classes/request.dto';
import { UserGender, UserRole, UserStatus } from '@common/constants/enum/user.enum';
import { UserEntity } from '@modules/database/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';

export class FindAllUserDto extends PageRequestDto {
  @ApiProperty({
    type: UserRole,
    enum: UserRole,
    required: false,
    example: UserRole.USER,
    description: 'Filter by user role',
  })
  @IsEnum(UserRole)
  @IsOptional()
  role: UserRole;

  @ApiProperty({
    type: UserStatus,
    enum: UserStatus,
    required: false,
    example: UserStatus.ACTIVE,
    description: 'Filter by user status',
  })
  @IsEnum(UserStatus)
  @IsOptional()
  status: UserStatus;

  @ApiProperty({
    type: UserGender,
    enum: UserGender,
    required: false,
    example: UserGender.MALE,
    description: 'Filter by user gender',
  })
  @IsEnum(UserGender)
  @IsOptional()
  gender: UserGender;
}

export class FindAllUserResponseDto {
  @ApiProperty({
    type: String,
    example: 'user-id-123',
    description: 'User unique identifier',
  })
  id: string;

  @ApiProperty({
    type: String,
    example: 'John Doe',
    description: 'User full name',
  })
  name: string;

  @ApiProperty({
    type: String,
    example: 'user@example.com',
    description: 'User email address',
  })
  email: string;

  @ApiProperty({
    type: UserGender,
    enum: UserGender,
    example: UserGender.MALE,
    description: 'User gender',
  })
  gender: UserGender;

  @ApiProperty({
    type: String,
    example: 'https://example.com/avatar.jpg',
    description: 'User avatar URL',
  })
  avatar: string;

  @ApiProperty({
    type: String,
    example: 'https://example.com/background.jpg',
    description: 'User background image URL',
  })
  background: string;

  @ApiProperty({
    type: Date,
    example: '1990-01-01',
    description: 'User birthday',
  })
  birthday: Date;

  @ApiProperty({
    type: UserRole,
    enum: UserRole,
    example: UserRole.USER,
    description: 'User role',
  })
  role: UserRole;

  @ApiProperty({
    type: UserStatus,
    enum: UserStatus,
    example: UserStatus.ACTIVE,
    description: 'User status',
  })
  status: UserStatus;

  @ApiProperty({
    type: Date,
    example: '2024-01-01T00:00:00.000Z',
    description: 'User creation date',
  })
  createdAt: Date;

  @ApiProperty({
    type: Date,
    example: '2024-01-01T00:00:00.000Z',
    description: 'User last update date',
  })
  updatedAt: Date;

  constructor(props: UserEntity) {
    this.id = props.id;
    this.name = props.name;
    this.email = props.email;
    this.gender = props.gender;
    this.avatar = props.avatar;
    this.background = props.background;
    this.birthday = props.birthday;
    this.role = props.role;
    this.status = props.status;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }
}
