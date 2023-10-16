import { Controller, Inject, Post, Body, Param } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('payments')
export class PaymentController {
  constructor(@Inject(PaymentService) private service: PaymentService) {}

  @Post('pix')
  async create(@Body() body: any) {
    return this.service.create();
  }
}
