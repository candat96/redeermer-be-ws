import { PaypalCurrencyCode } from '@common/constants/enum/payment.enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateCheckoutLinkDto {
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
