import {
  PaymentWebhookPayload,
  PaymentWebhookResponse,
} from '@common/interfaces/payment.interface';
import { CheckoutDto } from '@modules/payment/dto/checkout.dto';
import { PaypalService } from '@modules/payment/paypal/paypal.service';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class PaymentService {
  private readonly logger = new Logger(PaymentService.name);

  constructor(private readonly paypalService: PaypalService) {}

  async checkout(dto: CheckoutDto): Promise<string> {
    return await this.paypalService.createOrder({
      amount: dto.amount,
      currencyCode: dto.currencyCode,
    });
  }

  async webhook(data: PaymentWebhookPayload): Promise<PaymentWebhookResponse> {
    this.logger.log(`Received payment webhook: ${data.event_type}`, {
      webhookId: data.id,
      eventType: data.event_type,
      resourceId: data.resource?.id,
    });

    return {
      success: true,
      message: 'Webhook processed successfully',
      data: data,
    };
  }
}
