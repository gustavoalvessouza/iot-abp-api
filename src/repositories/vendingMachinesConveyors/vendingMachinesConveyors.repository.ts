import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import {
  CreateVendingMachineConveyorsDTO,
  UpdateVendingMachineConveyorsDTO,
  DeleteVendingMachineConveyorsDTO,
} from '../../modules/vendingMachinesConveyors/dto';

@Injectable()
export class VendingMachineConveyorsRepository {
  //#region DEPENDENCIES
  @Inject(PrismaService) private prisma: PrismaService;
  //#endregion

  async create({ data }: CreateVendingMachineConveyorsDTO) {
    return this.prisma.vendingMachinesConveyors.create({
      data,
    });
  }

  async update({ id, data }: UpdateVendingMachineConveyorsDTO) {
    return this.prisma.vendingMachinesConveyors.update({
      data,
      where: {
        id,
      },
    });
  }

  async findById(id: string) {
    return this.prisma.vendingMachinesConveyors.findFirst({
      where: {
        id,
      },
    });
  }

  async findByEspIp(espIp: string, id?: string) {
    return this.prisma.vendingMachinesConveyors.findFirst({
      where: {
        espIp,
        id: id
          ? {
              not: id,
            }
          : undefined,
      },
    });
  }

  async deleteById({ id }: DeleteVendingMachineConveyorsDTO) {
    return this.prisma.vendingMachinesConveyors.delete({
      where: {
        id,
      },
    });
  }
}
