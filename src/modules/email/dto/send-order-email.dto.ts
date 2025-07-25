import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber, IsString, IsNotEmpty } from 'class-validator';

export class SendOrderEmailDto {
  @ApiProperty({
    type: String,
    example: 'customer@example.com',
    description: 'Customer email address',
  })
  @IsString()
  @IsNotEmpty()
  receiver: string;

  @ApiProperty({
    type: String,
    example: 'ORD-2024-001',
    description: 'Order code',
  })
  @IsString()
  @IsNotEmpty()
  orderCode: string;

  @ApiProperty({
    type: String,
    example: 'John Doe',
    description: 'Customer name',
  })
  @IsString()
  @IsNotEmpty()
  customerName: string;

  @ApiProperty({
    type: Date,
    example: '2024-01-15T10:30:00Z',
    description: 'Order date',
  })
  @IsDateString()
  @IsNotEmpty()
  orderDate: Date;

  @ApiProperty({
    type: String,
    example: 'PayPal',
    description: 'Payment method',
  })
  @IsString()
  @IsNotEmpty()
  paymentMethod: string;

  @ApiProperty({
    type: Number,
    example: 1000.0,
    description: 'Order amount',
  })
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @ApiProperty({
    type: String,
    example: 'order-confirmation-template',
    description: 'Email template ID',
  })
  @IsString()
  @IsNotEmpty()
  templateId: string;
}
