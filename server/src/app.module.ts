import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {
  PaymentModule,
  ProductModule,
  VendingMachineModule,
  VendingMachineConveyorModule,
  ShoppingModule,
} from './modules';

ConfigModule.forRoot({
  isGlobal: true,
});

@Module({
  imports: [
    PaymentModule,
    VendingMachineModule,
    ProductModule,
    VendingMachineConveyorModule,
    ShoppingModule,
    ConfigModule.forRoot(),
  ],
  providers: [],
})
export class AppModule {}
