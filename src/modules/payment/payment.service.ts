import { Injectable } from '@nestjs/common';

@Injectable()
export class PaymentService {
  constructor() {}

  create(body: any): { message: string } {
    return {
      message: 'Hello world',
    };
  }
}
