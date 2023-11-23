import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { RegisterShoppingDTO } from 'src/modules/shopping/dto';
import { CheckHasShoppingDTO } from 'src/modules/shopping/dto/CheckHasShopping.dto';

@Injectable()
export class ShoppingRepository {
  //#region DEPENDENCIES
  @Inject(PrismaService) private prisma: PrismaService;
  //#endregion

  async register({ data }: { data: RegisterShoppingDTO }) {
    return this.prisma.shoppings.create({
      data,
    });
  }

  async checkHasShopping({ conveyorId }: CheckHasShoppingDTO) {
    return this.prisma.shoppings.findFirst({
      select: {
        conveyorId: true,
        isProcessed: true,
      },
      where: {
        isProcessed: false,
        conveyorId,
      },
    });
  }

  async markHasProcessed(id: string) {
    return this.prisma.shoppings.update({
      data: {
        isProcessed: true,
      },
      where: {
        id,
      },
    });
  }
}
