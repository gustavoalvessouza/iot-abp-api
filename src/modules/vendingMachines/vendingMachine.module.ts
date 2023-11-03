import { Module } from '@nestjs/common';
import { VendingMachineController } from './vendingMachine.controller';
import { VendingMachineRepository } from 'src/repositories';
import { PrismaService } from 'src/database/prisma.service';
import { HandleErrors } from 'src/utils/HandleErrors';

import {
  CreateVendingMachineUseCase,
  UpdateVendingMachineUseCase,
  DeleteVendingMachineUseCase,
  FindAllVendingMachineUseCase,
} from './use-case';

@Module({
  imports: [],
  providers: [
    HandleErrors,
    PrismaService,
    VendingMachineRepository,
    CreateVendingMachineUseCase,
    UpdateVendingMachineUseCase,
    FindAllVendingMachineUseCase,
    DeleteVendingMachineUseCase,
  ],
  exports: [],
  controllers: [VendingMachineController],
})
export class VendingMachineModule {}
