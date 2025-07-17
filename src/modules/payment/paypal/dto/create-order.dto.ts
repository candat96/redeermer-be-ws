import { PaypalCurrencyCode } from '@common/constants/enum/payment.enum';

export class CreateOrderDto {
  currencyCode: PaypalCurrencyCode;
  amount: number;
}

export class CreateOrderResponseDto {
  id: string;
  payment_source: any;
  links: { href: string; rel: string; method: string }[];
}
