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

  async execute({ conveyorId }: CheckHasShoppingDTO) {
    await this.checkMachineConveyorExists({ conveyorId });

    this.error.checkErrors();

    return this.checkHasShopping({ conveyorId });
  }

  //#region IMPLEMENATION

  private async checkMachineConveyorExists({ conveyorId }: CheckHasShoppingDTO) {
    const machine = await this.conveyorsRepository.findById(conveyorId);

    if (!machine) this.error.add('Vending machine conveyor not found');
  }

  private async checkHasShopping({ conveyorId }: CheckHasShoppingDTO) {
    const shopping = await this.repository.checkHasShopping({
      conveyorId,
    });

    let hasShopping = false;

    if (shopping) {
      hasShopping = true;
      await this.repository.markHasProcessed(shopping.conveyorId);
    }

    return {
      response: hasShopping,
    };
  }
  //#endregion
}
