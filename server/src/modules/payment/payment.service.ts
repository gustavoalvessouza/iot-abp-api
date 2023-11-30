import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { randomBytes } from 'crypto';

@Injectable()
export class PaymentService {
  constructor() {}

  private readonly API_ROUTE = 'payments';

  async create(body: any): Promise<any> {
    try {
      const randomKey = randomBytes(20).toString('hex');
      const headers = {
        accept: 'application/json',
        'content-type': 'application/json',
        'X-Idempotency-Key': `${randomKey}`,
        Authorization: `Bearer ${process.env.MERCADO_PAGO_ACCESS_TOKEN}`,
      };

      const { data } = await axios.post(`${process.env.MERCADO_PAGO_PAYMENT_URL}/${this.API_ROUTE}`, body, {
        headers,
      });

      return { data };
    } catch (err) {
      return {
        error: true,
        message: err.mesage,
      };
    }
  }

  async status({ paymentId }: { paymentId: string }): Promise<any> {
    try {
      const headers = {
        accept: 'application/json',
        'content-type': 'application/json',
        Authorization: `Bearer ${process.env.MERCADO_PAGO_ACCESS_TOKEN}`,
      };

      const { data } = await axios.get(`${process.env.MERCADO_PAGO_PAYMENT_URL}/${this.API_ROUTE}/${paymentId}`, {
        headers,
      });

      return data;
    } catch (err) {
      return {
        error: true,
        message: err.mesage,
      };
    }
  }
}
