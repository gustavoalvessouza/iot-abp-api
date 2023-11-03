import { Inject, Injectable } from '@nestjs/common';
import { VendingMachineConveyorsRepository } from 'src/repositories';

import { HandleErrors } from 'src/utils/HandleErrors';
import { DeleteVendingMachineConveyorsDTO } from '../dto';

@Injectable()
export class DeleteVendingMachineConveyorsUseCase {
  //#region DEPENDENCIES
  @Inject(VendingMachineConveyorsRepository) private repository: VendingMachineConveyorsRepository;

  @Inject(HandleErrors) private error: HandleErrors;
  //#endregion

  async execute({ id }: DeleteVendingMachineConveyorsDTO) {
    await this.checkConveyorExists({ id });

    this.error.checkErrors();

    return this.deleteConveyor({ id });
  }

  //#region IMPLEMENATION
  private async checkConveyorExists({ id }: DeleteVendingMachineConveyorsDTO) {
    const conveyor = await this.repository.findById(id);

    if (!conveyor) this.error.add('Vending machine conveyor not found');
  }

  private async deleteConveyor({ id }: DeleteVendingMachineConveyorsDTO) {
    await this.repository.deleteById({ id });
    return {
      message: ['Vending machine conveyor deleted successfully'],
    };
  }
  //#endregion
}
