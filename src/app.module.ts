import { Module } from '@nestjs/common';
import {
  PaymentModule,
  ProductModule,
  VendingMachineModule,
  VendingMachineConveyorModule,
  ShoppingModule,
} from './modules';

@Module({
  imports: [PaymentModule, VendingMachineModule, ProductModule, VendingMachineConveyorModule, ShoppingModule],
  providers: [],
})
export class AppModule {}
