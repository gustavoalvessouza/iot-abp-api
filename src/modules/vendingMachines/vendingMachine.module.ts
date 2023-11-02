import { Module } from '@nestjs/common';
import { VendingMachineController } from './vendingMachine.controller';
import { VendingMachineService } from './vendingMachine.service';
import { VendingMachineRepository } from 'src/repositories/vendingMachines';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  imports: [],
  providers: [VendingMachineService, VendingMachineRepository, PrismaService],
  exports: [],
  controllers: [VendingMachineController],
})
export class VendingMachineModule {}
