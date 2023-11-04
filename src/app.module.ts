import { Module } from '@nestjs/common';
import { PaymentModule, ProductModule, VendingMachineModule, VendingMachineConveyorModule } from './modules';

@Module({
  imports: [PaymentModule, VendingMachineModule, ProductModule, VendingMachineConveyorModule],
  providers: [],
})
export class AppModule {}
