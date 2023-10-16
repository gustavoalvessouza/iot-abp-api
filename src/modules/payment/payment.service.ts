import { Injectable } from '@nestjs/common';

@Injectable()
export class PaymentService {
  constructor() {}

  create(): { message: string } {
    return {
      message: 'Hello world',
    };
  }
}
