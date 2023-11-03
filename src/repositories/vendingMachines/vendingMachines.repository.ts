import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class VendingMachineRepository {
  constructor(private prisma: PrismaService) {}

  async create(args: Prisma.vendingMachinesCreateArgs) {
    return this.prisma.vendingMachines.create(args);
  }

  async update(args: Prisma.vendingMachinesUpdateArgs) {
    return this.prisma.vendingMachines.update(args);
  }

  async find(args: Prisma.vendingMachinesFindFirstArgs) {
    return this.prisma.vendingMachines.findFirst(args);
  }
}
