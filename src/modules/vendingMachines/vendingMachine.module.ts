import { Module } from '@nestjs/common';
import { VendingMachineController } from './vendingMachine.controller';
import { VendingMachineService } from './vendingMachine.service';
import { VendingMachineRepository } from 'src/repositories/vendingMachines';
import { PrismaService } from 'src/database/prisma.service';
import { VendingMachineUseCase } from './use-case';
import { ErrorService } from 'src/utils/ReponseErrors';

@Module({
  imports: [],
  providers: [
    VendingMachineService,
    VendingMachineRepository,
    PrismaService,
    VendingMachineUseCase,
    ErrorService,
  ],
  exports: [],
  controllers: [VendingMachineController],
})
export class VendingMachineModule {}
