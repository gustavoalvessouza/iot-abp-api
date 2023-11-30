import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import {
  CreateVendingMachineDTO,
  FindAllVendingMachineDTO,
  UpdateVendingMachineDTO,
  DeleteVendingMachineDTO,
  FindProductsVendingMachineDTO,
} from 'src/modules/vendingMachines/dto';

@Injectable()
export class VendingMachineRepository {
  //#region DEPENDENCIES
  @Inject(PrismaService) private prisma: PrismaService;
  //#endregion

  async create({ data }: CreateVendingMachineDTO) {
    return this.prisma.vendingMachines.create({ data });
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

  async findProducts({ id }: FindProductsVendingMachineDTO) {
    return this.prisma.vendingMachines.findFirst({
      select: {
        id: true,
        name: true,
        location: true,
        conveyors: {
          select: {
            id: true,
            espIp: true,
            amount: true,
            product: {
              select: {
                id: true,
                image: true,
                name: true,
                price: true,
                description: true,
              },
            },
          },
        },
      },
      where: {
        id,
      },
    });
  }

  async deleteById({ id }: DeleteVendingMachineDTO) {
    return this.prisma.vendingMachines.delete({
      where: {
        id,
      },
    });
  }
}
