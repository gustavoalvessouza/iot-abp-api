import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import {
  CreateVendingMachineDTO,
  FindAllVendingMachineDTO,
  UpdateVendingMachineDTO,
} from 'src/modules/vendingMachines/dto';

@Injectable()
export class VendingMachineRepository {
  //#region DEPENDENCIES
  @Inject(PrismaService) private prisma: PrismaService;
  //#endregion

  async create(args: CreateVendingMachineDTO) {
    return this.prisma.vendingMachines.create(args);
  }

  async update({ id, data }: UpdateVendingMachineDTO) {
    return this.prisma.vendingMachines.update({
      data,
      where: {
        id,
      },
    });
  }

  async findById(id: string) {
    return this.prisma.vendingMachines.findFirst({
      where: {
        id,
      },
    });
  }

  async findByName(name: string, machineId?: string) {
    return this.prisma.vendingMachines.findFirst({
      where: {
        name,
        id: machineId
          ? {
              not: machineId,
            }
          : undefined,
      },
    });
  }

  async findAll({ page, take }: FindAllVendingMachineDTO) {
    const [vendingMachines, count] = await this.prisma.$transaction([
      this.prisma.vendingMachines.findMany({
        take: Number(take),
        skip: (Number(page) - 1) * Number(take),
      }),
      this.prisma.vendingMachines.count(),
    ]);

    return {
      vendingMachines,
      count,
    };

    return;
  }

  async deleteById(id: string) {
    return this.prisma.vendingMachines.delete({
      where: {
        id,
      },
    });
  }
}
