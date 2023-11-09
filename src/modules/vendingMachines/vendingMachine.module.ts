import { Module } from '@nestjs/common';
import { VendingMachineController } from './vendingMachine.controller';
import { VendingMachineRepository } from 'src/repositories';
import { PrismaService } from 'src/database/prisma.service';
import { HandleErrors } from 'src/utils/handleErrors';
import { Masks } from 'src/utils/masks/Masks';

import {
  CreateVendingMachineUseCase,
  UpdateVendingMachineUseCase,
  DeleteVendingMachineUseCase,
  FindAllVendingMachineUseCase,
  FindProductsVendingMachineUseCase,
} from './use-case';

@Module({
  imports: [],
  providers: [
    HandleErrors,
    Masks,
    PrismaService,
    VendingMachineRepository,
    CreateVendingMachineUseCase,
    UpdateVendingMachineUseCase,
    FindAllVendingMachineUseCase,
    DeleteVendingMachineUseCase,
    FindProductsVendingMachineUseCase,
  ],
  exports: [],
  controllers: [VendingMachineController],
})
export class VendingMachineModule {}
