import { UserGender } from '@common/constants/enum/user.enum';
import { IsDateStringAllFormat } from '@common/decorators/is-date-string-all-format.decorator';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdateMeDto {
  @ApiProperty({ type: String, required: false })
  @IsString()
  @IsOptional()
  email: string;

  @ApiProperty({ type: String, required: false })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({ type: Date, required: false })
  @IsDateStringAllFormat()
  @IsOptional()
  birthday: Date;

  @ApiProperty({ type: UserGender, enum: UserGender, required: false })
  @IsEnum(UserGender)
  @IsOptional()
  gender: UserGender;

  @ApiProperty({ type: String, required: false })
  @IsString()
  @IsOptional()
  avatar: string;

  @ApiProperty({ type: String, required: false })
  @IsString()
  @IsOptional()
  background: string;

  @ApiProperty({ type: String, required: false })
  @IsString()
  @IsOptional()
  password: string;
}
