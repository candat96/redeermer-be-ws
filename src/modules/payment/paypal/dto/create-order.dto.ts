import { PaypalCurrencyCode } from '@common/constants/enum/payment.enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsString, IsArray } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({
    type: PaypalCurrencyCode,
    enum: PaypalCurrencyCode,
    required: true,
    description: 'Payment currency code',
  })
  @IsEnum(PaypalCurrencyCode)
  @IsNotEmpty()
  currencyCode: PaypalCurrencyCode;

  @ApiProperty({
    type: Number,
    required: true,
    description: 'Payment amount',
  })
  @IsNumber()
  @IsNotEmpty()
  amount: number;
}

export class CreateOrderResponseDto {
  @ApiProperty({
    type: String,
    description: 'PayPal order ID',
  })
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({
    type: Object,
    description: 'Payment source information',
  })
  payment_source: any;

  @ApiProperty({
    type: Array,
    description: 'PayPal order links',
  })
  @IsArray()
  links: { href: string; rel: string; method: string }[];
}
