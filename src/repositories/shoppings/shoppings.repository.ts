import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { RegisterShoppingDTO } from 'src/modules/shopping/dto';

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
}
