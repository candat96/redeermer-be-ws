import { PageRequestDto } from '@common/classes/request.dto';
import { UserGender, UserRole, UserStatus } from '@common/constants/enum/user.enum';
import { UserEntity } from '@modules/database/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';

export class FindAllUserDto extends PageRequestDto {
  @ApiProperty({ type: UserRole, enum: UserRole, required: false })
  @IsEnum(UserRole)
  @IsOptional()
  role: UserRole;

  @ApiProperty({ type: UserStatus, enum: UserStatus, required: false })
  @IsEnum(UserStatus)
  @IsOptional()
  status: UserStatus;

  @ApiProperty({ type: UserGender, enum: UserGender, required: false })
  @IsEnum(UserGender)
  @IsOptional()
  gender: UserGender;
}

export class FindAllUserResponseDto {
  id: string;
  name: string;
  email: string;
  gender: UserGender;
  avatar: string;
  background: string;
  birthday: Date;
  role: UserRole;
  status: UserStatus;
  createdAt: Date;
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
