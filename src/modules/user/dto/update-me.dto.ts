import { UserGender } from '@common/constants/enum/user.enum';
import { IsDateStringAllFormat } from '@common/decorators/is-date-string-all-format.decorator';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdateMeDto {
  @ApiProperty({
    type: String,
    required: false,
    example: 'user@example.com',
    description: 'User email address',
  })
  @IsString()
  @IsOptional()
  email: string;

  @ApiProperty({
    type: String,
    required: false,
    example: 'John Doe',
    description: 'User full name',
  })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({
    type: Date,
    required: false,
    example: '1990-01-01',
    description: 'User birthday',
  })
  @IsDateStringAllFormat()
  @IsOptional()
  birthday: Date;

  @ApiProperty({
    type: UserGender,
    enum: UserGender,
    required: false,
    example: UserGender.MALE,
    description: 'User gender',
  })
  @IsEnum(UserGender)
  @IsOptional()
  gender: UserGender;

  @ApiProperty({
    type: String,
    required: false,
    example: 'https://example.com/avatar.jpg',
    description: 'User avatar URL',
  })
  @IsString()
  @IsOptional()
  avatar: string;

  @ApiProperty({
    type: String,
    required: false,
    example: 'https://example.com/background.jpg',
    description: 'User background image URL',
  })
  @IsString()
  @IsOptional()
  background: string;

  @ApiProperty({
    type: String,
    required: false,
    example: 'newpassword123',
    description: 'New user password',
  })
  @IsString()
  @IsOptional()
  password: string;
}
