import { Module } from '@nestjs/common';
import { PaymentModule, ProductModule, VendingMachineModule } from './modules';

@Module({
  imports: [PaymentModule, VendingMachineModule, ProductModule],
  providers: [],
})
export class AppModule {}
