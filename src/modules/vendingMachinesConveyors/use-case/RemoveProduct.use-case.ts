import { Inject, Injectable } from '@nestjs/common';
import { ProductRepository, VendingMachineConveyorsRepository } from 'src/repositories';

import { HandleErrors } from 'src/utils/handleErrors';
import { RemoveProductConveyorsDTO } from '../dto';

@Injectable()
export class RemoveProductUseCase {
  //#region DEPENDENCIES
  @Inject(VendingMachineConveyorsRepository) private repository: VendingMachineConveyorsRepository;

  @Inject(ProductRepository) private productRepository: ProductRepository;

  @Inject(HandleErrors) private error: HandleErrors;
  //#endregion

  async execute({ id }: RemoveProductConveyorsDTO) {
    await this.checkMachineConveyorExists({ id });

    this.error.checkErrors();

    return this.removeProductConveyor({ id });
  }

  //#region IMPLEMENATION
  private async checkMachineConveyorExists({ id }: RemoveProductConveyorsDTO) {
    const machine = await this.repository.findById(id);

    if (!machine) this.error.add('Vending machine conveyor not found');
  }

  private async removeProductConveyor(args: RemoveProductConveyorsDTO) {
    const conveyor = await this.repository.removeProduct(args);
    return {
      conveyor,
      message: ['Product removed on conveyor successfully'],
    };
  }
  //#endregion
}
