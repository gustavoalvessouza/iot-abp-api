import { Inject, Injectable } from '@nestjs/common';
import { VendingMachineConveyorsRepository } from 'src/repositories';

import { HandleErrors } from 'src/utils/handleErrors';
import { DeleteConveyorsDTO } from '../dto';

@Injectable()
export class DeleteConveyorsUseCase {
  //#region DEPENDENCIES
  @Inject(VendingMachineConveyorsRepository) private repository: VendingMachineConveyorsRepository;

  @Inject(HandleErrors) private error: HandleErrors;
  //#endregion

  async execute({ id }: DeleteConveyorsDTO) {
    await this.checkConveyorExists({ id });

    this.error.checkErrors();

    return this.deleteConveyor({ id });
  }

  //#region IMPLEMENATION
  private async checkConveyorExists({ id }: DeleteConveyorsDTO) {
    const conveyor = await this.repository.findById(id);

    if (!conveyor) this.error.add('Vending machine conveyor not found');
  }

  private async deleteConveyor({ id }: DeleteConveyorsDTO) {
    await this.repository.deleteById({ id });
    return {
      message: ['Vending machine conveyor deleted successfully'],
    };
  }
  //#endregion
}
