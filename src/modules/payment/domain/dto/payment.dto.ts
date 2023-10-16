import { IsNotEmpty } from 'class-validator';

export class PaymentRequestBodyDTO {
  @IsNotEmpty()
  user_id: string;
}
