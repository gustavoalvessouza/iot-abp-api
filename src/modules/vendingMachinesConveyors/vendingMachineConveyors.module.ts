import { Module } from '@nestjs/common';
import { VendingMachineController } from './vendingMachineConveyors.controller';
import { VendingMachineRepository, ProductRepository, VendingMachineConveyorsRepository } from 'src/repositories';
import { PrismaService } from 'src/database/prisma.service';
import { HandleErrors } from 'src/utils/HandleErrors';

import {
  CreateVendingMachineConveyorsUseCase,
  UpdateVendingMachineConveyorsUseCase,
  DeleteVendingMachineConveyorsUseCase,
} from './use-case';

@Module({
  imports: [],
  providers: [
    HandleErrors,
    PrismaService,
    VendingMachineRepository,
    ProductRepository,
    VendingMachineConveyorsRepository,
    CreateVendingMachineConveyorsUseCase,
    UpdateVendingMachineConveyorsUseCase,
    DeleteVendingMachineConveyorsUseCase,
  ],
  exports: [],
  controllers: [VendingMachineController],
})
export class VendingMachineConveyorModule {}
