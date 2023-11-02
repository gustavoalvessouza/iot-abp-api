import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { Prisma, vendingMachines } from '@prisma/client';

@Injectable()
export class VendingMachineRepository {
  constructor(private prisma: PrismaService) {}

  async create(
    data: Prisma.vendingMachinesCreateInput,
  ): Promise<vendingMachines> {
    return this.prisma.vendingMachines.create({
      data,
    });
  }
}
