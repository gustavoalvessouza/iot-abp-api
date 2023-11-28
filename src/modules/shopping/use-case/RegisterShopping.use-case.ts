import { Inject, Injectable } from '@nestjs/common';
import { VendingMachineConveyorsRepository, ShoppingRepository } from 'src/repositories';

import { HandleErrors } from 'src/utils/handleErrors';
import { RegisterShoppingDTO } from '../dto';

@Injectable()
export class RegisterShoppingUseCase {
  //#region DEPENDENCIES

  @Inject(ShoppingRepository) private repository: ShoppingRepository;

  @Inject(VendingMachineConveyorsRepository) private conveyorsRepository: VendingMachineConveyorsRepository;

  @Inject(HandleErrors) private error: HandleErrors;
  //#endregion

  async execute({ data }: { data: RegisterShoppingDTO }) {
    await this.checkConveyorExists({ data });

    this.error.checkErrors();

    return this.registerShopping({ data });
  }

  //#region IMPLEMENATION

  private async checkConveyorExists({ data }: { data: RegisterShoppingDTO }) {
    const conveyor = await this.conveyorsRepository.findById(data.conveyorId);

    if (!conveyor) this.error.add('Conveyor not found');

    if (conveyor.amount - 1 === 0) {
      this.error.add('Product is not in stock');
    }
  }

  private async registerShopping({ data }: { data: RegisterShoppingDTO }) {
    const product = await this.repository.register({
      data,
    });

    await this.conveyorsRepository.decrementStock({ id: data.conveyorId });

    return {
      product,
      message: ['Shopping registered successfully'],
    };
  }
  //#endregion
}
