import { Module } from '@nestjs/common';
import { productController } from './shopping.controller';
import { PrismaService } from 'src/database';
import { HandleErrors } from 'src/utils/handleErrors';
import {
  ProductRepository,
  ShoppingRepository,
  VendingMachineConveyorsRepository,
  VendingMachineRepository,
} from 'src/repositories';

import { RegisterShoppingUseCase, CheckHasShoppingUseCase } from './use-case';
import { Masks } from 'src/utils/masks/Masks';

@Module({
  imports: [],
  providers: [
    HandleErrors,
    PrismaService,
    ProductRepository,
    RegisterShoppingUseCase,
    Masks,
    ShoppingRepository,
    VendingMachineConveyorsRepository,
    CheckHasShoppingUseCase,
    VendingMachineRepository,
  ],
  exports: [],
  controllers: [productController],
})
export class ShoppingModule {}
