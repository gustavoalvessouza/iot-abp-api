import { Module } from '@nestjs/common';
import { VendingMachineController } from './vendingMachine.controller';
import { VendingMachineRepository } from 'src/repositories/vendingMachines';
import { PrismaService } from 'src/database/prisma.service';
import { HandleErrors } from 'src/utils/HandleErrors';
import { CreateVendingMachineUseCase, UpdateVendingMachineUseCase } from './use-case';

@Module({
  imports: [],
  providers: [
    HandleErrors,
    PrismaService,
    VendingMachineRepository,
    UpdateVendingMachineUseCase,
    CreateVendingMachineUseCase,
  ],
  exports: [],
  controllers: [VendingMachineController],
})
export class VendingMachineModule {}
