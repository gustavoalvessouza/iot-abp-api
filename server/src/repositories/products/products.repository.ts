import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateProductDTO, DeleteProductDTO, FindAllProductDTO, UpdateProductDTO } from '../../modules/products/dto';

@Injectable()
export class ProductRepository {
  //#region DEPENDENCIES
  @Inject(PrismaService) private prisma: PrismaService;
  //#endregion

  async create(args: CreateProductDTO) {
    return this.prisma.products.create(args);
  }

  async update({ id, data }: UpdateProductDTO) {
    return this.prisma.products.update({
      data,
      where: {
        id: id,
      },
    });
  }

  async findById(id: string) {
    return this.prisma.products.findFirst({
      where: {
        id,
      },
    });
  }

  async findByName(name: string, machineId?: string) {
    return this.prisma.products.findFirst({
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

  async findAll({ page, take }: FindAllProductDTO) {
    const [products, count] = await this.prisma.$transaction([
      this.prisma.products.findMany({
        take: Number(take),
        skip: (Number(page) - 1) * Number(take),
      }),
      this.prisma.products.count(),
    ]);

    return {
      products,
      count,
    };

    return;
  }

  async deleteById({ id }: DeleteProductDTO) {
    return this.prisma.products.delete({
      where: {
        id,
      },
    });
  }
}
