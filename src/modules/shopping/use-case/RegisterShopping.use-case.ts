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
    const machine = await this.conveyorsRepository.findById(data.conveyorId);

    if (!machine) this.error.add('Conveyor not found');
  }

  private async registerShopping({ data }: { data: RegisterShoppingDTO }) {
    const product = await this.repository.register({
      data,
    });

    return {
      product,
      message: ['Shopping registered successfully'],
    };
  }
  //#endregion
}
