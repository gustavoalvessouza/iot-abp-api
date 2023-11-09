import { Inject, Injectable } from '@nestjs/common';
import { ProductRepository } from 'src/repositories';

import { HandleErrors } from 'src/utils/handleErrors';
import { CreateProductDTO } from '../dto';

@Injectable()
export class CreateProductUseCase {
  //#region DEPENDENCIES
  @Inject(ProductRepository) private repository: ProductRepository;

  @Inject(HandleErrors) private error: HandleErrors;
  //#endregion

  async execute({ data }: CreateProductDTO) {
    await this.checkProductExists({ data });

    this.error.checkErrors();

    return this.createProduct({ data });
  }

  //#region IMPLEMENATION
  private async checkProductExists({ data }: CreateProductDTO) {
    const machine = await this.repository.findByName(data.name);

    if (machine) this.error.add('Already exists a product with this name');
  }

  private async createProduct({ data }: CreateProductDTO) {
    data.price = data.price * 100;

    const product = await this.repository.create({
      data,
    });

    return {
      product,
      message: ['Product created successfully'],
    };
  }
  //#endregion
}
