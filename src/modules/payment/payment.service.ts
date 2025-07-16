import { CheckoutDto } from '@modules/payment/dto/checkout.dto';
import { PaypalService } from '@modules/payment/paypal/paypal.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PaymentService {
  constructor(private readonly paypalService: PaypalService) {}

  async checkout(dto: CheckoutDto): Promise<string> {
    return await this.paypalService.createOrder({
      amount: dto.amount,
      currencyCode: dto.currencyCode,
    });
  }

  async webhook(data: any) {
    console.log(data);
    return true;
  }
}
