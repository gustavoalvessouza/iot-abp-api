import { Inject, Injectable } from '@nestjs/common';
import { ProductRepository } from 'src/repositories';

import { HandleErrors } from 'src/utils/handleErrors';
import { UpdateProductDTO } from '../dto';

@Injectable()
export class UpdateProductUseCase {
  //#region DEPENDENCIES
  @Inject(ProductRepository) private repository: ProductRepository;

  @Inject(HandleErrors) private error: HandleErrors;
  //#endregion

  async execute({ id, data }: UpdateProductDTO) {
    await this.checkMachineExists({ id, data });
    await this.checkMachineNameHasUsed({ id, data });

    this.error.checkErrors();

    return this.updateMachine({ id, data });
  }

  //#region IMPLEMENATION
  private async checkMachineExists({ id }: UpdateProductDTO) {
    const machine = await this.repository.findById(id);

    if (!machine) this.error.add('Vending machine not found');
  }

  private async checkMachineNameHasUsed({ id, data }: UpdateProductDTO) {
    const machine = await this.repository.findByName(data.name, id);

    if (machine) this.error.add('Already exists a vending machine with this name');
  }

  private async updateMachine(args: UpdateProductDTO) {
    const product = await this.repository.update(args);
    return {
      product,
      message: ['Vending machine updated successfully'],
    };
  }
  //#endregion
}
