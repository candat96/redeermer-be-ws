import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber, IsString } from 'class-validator';

export class SendOrderEmailDto {
  @ApiProperty()
  @IsString()
  receiver: string;

  @ApiProperty()
  @IsString()
  orderCode: string;

  @ApiProperty()
  @IsString()
  customerName: string;

  @ApiProperty()
  @IsDateString()
  orderDate: Date;

  @ApiProperty()
  @IsString()
  paymentMethod: string;

  @ApiProperty()
  @IsNumber()
  amount: number;

  @ApiProperty()
  @IsString()
  templateId: string;
}
