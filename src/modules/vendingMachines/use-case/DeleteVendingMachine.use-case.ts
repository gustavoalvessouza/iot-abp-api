import { Inject, Injectable } from '@nestjs/common';
import { VendingMachineRepository } from 'src/repositories/vendingMachines';

import { HandleErrors } from 'src/utils/HandleErrors';
import { DeleteVendingMachineDTO } from '../dto';

@Injectable()
export class DeleteVendingMachineUseCase {
  //#region DEPENDENCIES
  @Inject(VendingMachineRepository) private repository: VendingMachineRepository;

  @Inject(HandleErrors) private error: HandleErrors;
  //#endregion

  async execute({ machineId }: DeleteVendingMachineDTO) {
    await this.checkMachineExists({ machineId });

    this.error.checkErrors();

    return this.deleteMachine({ machineId });
  }

  //#region IMPLEMENATION
  private async checkMachineExists({ machineId }: DeleteVendingMachineDTO) {
    const machine = await this.repository.findById(machineId);

    if (!machine) this.error.add('Vending machine not found');
  }

  private async deleteMachine({ machineId }: DeleteVendingMachineDTO) {
    return this.repository.deleteById(machineId);
  }
  //#endregion
}
