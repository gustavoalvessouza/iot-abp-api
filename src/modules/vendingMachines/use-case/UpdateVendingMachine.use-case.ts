import { Inject, Injectable } from '@nestjs/common';
import { VendingMachineRepository } from 'src/repositories/vendingMachines';

import { HandleErrors } from 'src/utils/HandleErrors';
import { UpdateVendingMachineDTO } from '../dto';

@Injectable()
export class UpdateVendingMachineUseCase {
  //#region DEPENDENCIES
  @Inject(VendingMachineRepository) private repository: VendingMachineRepository;

  @Inject(HandleErrors) private error: HandleErrors;
  //#endregion

  async execute({ machineId, data }: UpdateVendingMachineDTO) {
    await this.checkMachineExists({ machineId, data });
    await this.checkMachineNameHasUsed({ machineId, data });

    this.error.checkErrors();

    return this.updateMachine({ machineId, data });
  }

  //#region IMPLEMENATION
  private async checkMachineExists({ machineId }: UpdateVendingMachineDTO) {
    const machine = await this.repository.findById(machineId);

    if (!machine) this.error.add('Vending machine not found');
  }

  private async checkMachineNameHasUsed({ machineId, data }: UpdateVendingMachineDTO) {
    const machine = await this.repository.findByName(data.name, machineId);

    if (machine) this.error.add('Already exists a vending machine with this name');
  }

  private async updateMachine(args: UpdateVendingMachineDTO) {
    return this.repository.update(args);
  }
  //#endregion
}
