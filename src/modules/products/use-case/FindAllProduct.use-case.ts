import { Inject, Injectable } from '@nestjs/common';
import { ProductRepository } from 'src/repositories';

import { FindAllProductDTO } from '../dto';
import { products } from '@prisma/client';
import { Masks } from 'src/utils/masks/Masks';

@Injectable()
export class FindAllProductUseCase {
  //#region DEPENDENCIES
  @Inject(ProductRepository) private repository: ProductRepository;
  @Inject(Masks) private masks: Masks;

  //#endregion

  async execute({ take, page }: FindAllProductDTO) {
    const { products, count } = await this.findAllProducts({ page, take });

    await this.applyMask(products);

    return { products, count };
  }

  //#region IMPLEMENATION

  private async applyMask(products: products[]) {
    return products.map((product) => (product.price = this.masks.BRL(String(product.price)) as any));
  }

  private async findAllProducts({ page, take }: FindAllProductDTO) {
    return this.repository.findAll({ take, page });
  }
  //#endregion
}
