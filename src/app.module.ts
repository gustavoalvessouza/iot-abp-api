import { Module } from '@nestjs/common';
import { PaymentModule } from './modules';

@Module({
  imports: [PaymentModule],
})
export class AppModule {}
