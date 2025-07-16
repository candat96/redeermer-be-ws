import { ApiResponseDto } from '@common/classes/response.dto';
import { ApiMessageKey } from '@common/constants/message.constant';
import { BasicHeader } from '@common/decorators/basic-header.decorator';
import { AuthGuard } from '@common/guards/auth.guard';
import { CheckoutDto } from '@modules/payment/dto/checkout.dto';
import { PaymentService } from '@modules/payment/payment.service';
import {
  Body,
  Controller,
  HttpStatus,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation } from '@nestjs/swagger';

@BasicHeader('Payment')
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('checkout')
  @ApiOperation({
    summary: 'Create checkout link',
    description: 'Create checkout link',
  })
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOkResponse({ type: ApiResponseDto<string> })
  async checkout(@Body() body: CheckoutDto): Promise<ApiResponseDto<string>> {
    try {
      return new ApiResponseDto<string>({
        statusCode: HttpStatus.OK,
        data: await this.paymentService.checkout(body),
        message: ApiMessageKey.CREATE_CHECKOUT_LINK_SUCCESS,
        pagination: null,
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  @Post('checkout/webhook')
  @ApiOperation({
    summary: 'Checkout webhook',
    description: 'Checkout webhook',
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOkResponse({ type: ApiResponseDto<any> })
  async checkoutWebhook(@Body() body: any): Promise<ApiResponseDto<any>> {
    try {
      return new ApiResponseDto<any>({
        statusCode: HttpStatus.OK,
        data: await this.paymentService.webhook(body),
        message: ApiMessageKey.RECEIVE_CHECKOUT_WEBHOOKS_SUCCESS,
        pagination: null,
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
