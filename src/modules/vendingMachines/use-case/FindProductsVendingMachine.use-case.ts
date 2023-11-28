import { Inject, Injectable } from '@nestjs/common';
import { VendingMachineRepository } from 'src/repositories';

import { FindProductsVendingMachineDTO } from '../dto';
import { HandleErrors } from '../../../utils/handleErrors';
import { Masks } from '../../../utils/masks/Masks';

@Injectable()
export class FindProductsVendingMachineUseCase {
  //#region DEPENDENCIES
  @Inject(VendingMachineRepository) private repository: VendingMachineRepository;

  @Inject(HandleErrors) private error: HandleErrors;

  @Inject(Masks) private masks: Masks;

  //#endregion

  async execute({ id }: FindProductsVendingMachineDTO) {
    await this.checkMachineExists({ id });

    return this.findProducts({ id });
  }

  //#region IMPLEMENATION
  private async checkMachineExists({ id }: FindProductsVendingMachineDTO) {
    const machine = await this.repository.findById(id);

    if (!machine) this.error.add('Vending machine not found');
  }

  private async findProducts({ id }: FindProductsVendingMachineDTO) {
    const vendingMachineProducts = await this.repository.findProducts({ id });

    const products = vendingMachineProducts.conveyors.map(({ id, product, amount }) => ({
      conveyorId: id,

      name: product.name,
      image: product.image,
      description: product.description,
      price: this.masks.BRL(String(product.price)),
      amount,
    }));

    return {
      machineId: vendingMachineProducts.id,
      products,
    };
  }

  //#endregion
}
