import { Inject, Injectable } from '@nestjs/common';
import { ProductRepository, VendingMachineConveyorsRepository } from '../../../repositories';

import { HandleErrors } from 'src/utils/handleErrors';
import { AddProductConveyorsDTO } from '../dto';

@Injectable()
export class AddProductUseCase {
  //#region DEPENDENCIES
  @Inject(VendingMachineConveyorsRepository) private repository: VendingMachineConveyorsRepository;

  @Inject(ProductRepository) private productRepository: ProductRepository;

  @Inject(HandleErrors) private error: HandleErrors;
  //#endregion

  async execute({ id, data }: AddProductConveyorsDTO) {
    await this.checkMachineConveyorExists({ id, data });
    await this.checkProductExists({ id, data });

    this.error.checkErrors();

    return this.updateProductOnConveyor({ id, data });
  }

  //#region IMPLEMENATION
  private async checkMachineConveyorExists({ id }: AddProductConveyorsDTO) {
    const machine = await this.repository.findById(id);

    if (!machine) this.error.add('Vending machine conveyor not found');
  }

  private async checkProductExists({ data }: AddProductConveyorsDTO) {
    const product = await this.productRepository.findById(data.productId);

    if (!product) this.error.add('Product not found');
  }

  private async updateProductOnConveyor(args: AddProductConveyorsDTO) {
    const vendingMachineConveyor = await this.repository.addProduct(args);
    return {
      vendingMachineConveyor,
      message: ['Product added on conveyor successfully'],
    };
  }
  //#endregion
}
