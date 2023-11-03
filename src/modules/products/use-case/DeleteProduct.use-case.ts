import { Inject, Injectable } from '@nestjs/common';
import { ProductRepository } from 'src/repositories';

import { HandleErrors } from 'src/utils/HandleErrors';
import { DeleteProductDTO } from '../dto';

@Injectable()
export class DeleteProductUseCase {
  //#region DEPENDENCIES
  @Inject(ProductRepository) private repository: ProductRepository;

  @Inject(HandleErrors) private error: HandleErrors;
  //#endregion

  async execute({ id }: DeleteProductDTO) {
    await this.checkProductExists({ id });

    this.error.checkErrors();

    return this.deleteMachine({ id });
  }

  //#region IMPLEMENATION
  private async checkProductExists({ id }: DeleteProductDTO) {
    const product = await this.repository.findById(id);

    if (!product) this.error.add('Product not found');
  }

  private async deleteMachine({ id }: DeleteProductDTO) {
    await this.repository.deleteById({ id });
    return {
      message: ['Product deleted successfully'],
    };
  }
  //#endregion
}
