import { Inject, Injectable } from '@nestjs/common';
import { VendingMachineConveyorsRepository, ShoppingRepository, VendingMachineRepository } from 'src/repositories';

import { HandleErrors } from 'src/utils/handleErrors';
import { CheckHasShoppingDTO } from '../dto';

@Injectable()
export class CheckHasShoppingUseCase {
  //#region DEPENDENCIES

  @Inject(ShoppingRepository) private repository: ShoppingRepository;

  @Inject(VendingMachineConveyorsRepository) private conveyorsRepository: VendingMachineConveyorsRepository;

  @Inject(VendingMachineRepository) private vendingMachineRepository: VendingMachineConveyorsRepository;

  @Inject(HandleErrors) private error: HandleErrors;
  //#endregion

  async execute({ machineId }: CheckHasShoppingDTO) {
    await this.checkMachineExists({ machineId });

    this.error.checkErrors();

    return this.checkHasShopping({ machineId });
  }

  //#region IMPLEMENATION

  private async checkMachineExists({ machineId }: CheckHasShoppingDTO) {
    const machine = await this.vendingMachineRepository.findById(machineId);

    if (!machine) this.error.add('Vending machine not found');
  }
  private async checkHasShopping({ machineId }: CheckHasShoppingDTO) {
    const shoppings = await this.repository.checkHasShopping({
      machineId,
    });

    return {
      response: !!shoppings,
    };
  }
  //#endregion
}
