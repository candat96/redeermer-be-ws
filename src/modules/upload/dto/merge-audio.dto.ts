import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

export class AudioDto {
  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsNotEmpty()
  url: string;

  @ApiProperty({ type: Number, required: true })
  @IsNumber()
  @IsNotEmpty()
  order: number;
}

export class MergeAudioDto {
  @ApiProperty({ type: AudioDto, isArray: true, required: true })
  @IsArray()
  @ArrayNotEmpty()
  @IsNotEmpty()
  @Type(() => AudioDto)
  @ValidateNested({ each: true })
  audios: AudioDto[];
}
