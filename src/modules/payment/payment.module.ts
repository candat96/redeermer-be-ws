import { PaymentController } from '@modules/payment/payment.controller';
import { PaymentService } from '@modules/payment/payment.service';
import { PaypalModule } from '@modules/payment/paypal/paypal.module';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule, PaypalModule],
  controllers: [PaymentController],
  providers: [PaymentService],
  exports: [PaymentService],
})
export class PaymentModule {}
