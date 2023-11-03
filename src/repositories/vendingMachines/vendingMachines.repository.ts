import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateVendingMachineDTO, UpdateVendingMachineDTO } from 'src/modules/vendingMachines/dto';

@Injectable()
export class VendingMachineRepository {
  //#region DEPENDENCIES
  @Inject(PrismaService) private prisma: PrismaService;
  //#endregion

  async create(args: CreateVendingMachineDTO) {
    return this.prisma.vendingMachines.create(args);
  }

  async update({ machineId, data }: UpdateVendingMachineDTO) {
    return this.prisma.vendingMachines.update({
      data,
      where: {
        id: machineId,
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
}
