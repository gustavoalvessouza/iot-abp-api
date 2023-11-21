import { Inject, Injectable } from '@nestjs/common';
import { VendingMachineRepository } from 'src/repositories';

import { HandleErrors } from 'src/utils/handleErrors';
import { DeleteVendingMachineDTO } from '../dto';

@Injectable()
export class DeleteVendingMachineUseCase {
  //#region DEPENDENCIES
  @Inject(VendingMachineRepository) private repository: VendingMachineRepository;

  @Inject(HandleErrors) private error: HandleErrors;
  //#endregion

  async execute({ id }: DeleteVendingMachineDTO) {
    await this.checkMachineExists({ id });

    this.error.checkErrors();

    return this.deleteMachine({ id });
  }

  //#region IMPLEMENATION
  private async checkMachineExists({ id }: DeleteVendingMachineDTO) {
    const machine = await this.repository.findById(id);

    if (!machine) this.error.add('Vending machine not found');
  }

  private async deleteMachine({ id }: DeleteVendingMachineDTO) {
    await this.repository.deleteById({ id });
    return {
      message: ['Vending machine deleted successfully'],
    };
  }
  //#endregion
}
