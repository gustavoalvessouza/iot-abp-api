import { Module } from '@nestjs/common';
import { VendingMachineConveyorsController } from './vendingMachineConveyors.controller';
import { VendingMachineRepository, ProductRepository, VendingMachineConveyorsRepository } from 'src/repositories';
import { PrismaService } from 'src/database/prisma.service';
import { HandleErrors } from 'src/utils/handleErrors';

import {
  CreateConveyorsUseCase,
  AddProductUseCase,
  DeleteConveyorsUseCase,
  UpdateConveyorsUseCase,
  RemoveProductUseCase,
} from './use-case';

@Module({
  imports: [],
  providers: [
    HandleErrors,
    PrismaService,
    VendingMachineRepository,
    VendingMachineConveyorsRepository,
    ProductRepository,
    CreateConveyorsUseCase,
    AddProductUseCase,
    DeleteConveyorsUseCase,
    UpdateConveyorsUseCase,
    RemoveProductUseCase,
  ],
  exports: [],
  controllers: [VendingMachineConveyorsController],
})
export class VendingMachineConveyorModule {}
