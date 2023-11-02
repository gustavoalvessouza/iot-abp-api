import { Module } from '@nestjs/common';
import { PaymentModule, VendingMachineModule } from './modules';

@Module({
  imports: [PaymentModule, VendingMachineModule],
  providers: [],
})
export class AppModule {}
