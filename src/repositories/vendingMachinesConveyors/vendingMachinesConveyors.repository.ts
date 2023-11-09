import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import {
  AddProductConveyorsDTO,
  CreateConveyorsDTO,
  DeleteConveyorsDTO,
  RemoveProductConveyorsDTO,
  UpdateConveyorsDTO,
} from '../../modules/vendingMachinesConveyors/dto';

@Injectable()
export class VendingMachineConveyorsRepository {
  //#region DEPENDENCIES
  @Inject(PrismaService) private prisma: PrismaService;
  //#endregion

  async create({ data }: CreateConveyorsDTO) {
    return this.prisma.vendingMachinesConveyors.create({
      data,
    });
  }

  async update({ id, data }: UpdateConveyorsDTO) {
    return this.prisma.vendingMachinesConveyors.update({
      data,
      where: {
        id,
      },
    });
  }

  async addProduct({ id, data }: AddProductConveyorsDTO) {
    return this.prisma.vendingMachinesConveyors.update({
      data,
      where: {
        id,
      },
    });
  }

  async removeProduct({ id }: RemoveProductConveyorsDTO) {
    return this.prisma.vendingMachinesConveyors.update({
      data: {
        productId: null,
        amount: 0,
      },
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

  async deleteById({ id }: DeleteConveyorsDTO) {
    return this.prisma.vendingMachinesConveyors.delete({
      where: {
        id,
      },
    });
  }
}
