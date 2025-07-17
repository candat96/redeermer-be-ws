import { HttpHelperModule } from '@modules/http-helper/http-helper.module';
import { PaypalService } from '@modules/payment/paypal/paypal.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [HttpHelperModule],
  controllers: [],
  providers: [PaypalService],
  exports: [PaypalService],
})
export class PaypalModule {}
