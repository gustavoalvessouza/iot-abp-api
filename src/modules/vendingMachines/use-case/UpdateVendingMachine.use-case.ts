import { Inject, Injectable } from '@nestjs/common';
import { VendingMachineRepository } from 'src/repositories';

import { HandleErrors } from 'src/utils/HandleErrors';
import { UpdateVendingMachineDTO } from '../dto';

@Injectable()
export class UpdateVendingMachineUseCase {
  //#region DEPENDENCIES
  @Inject(VendingMachineRepository) private repository: VendingMachineRepository;

  @Inject(HandleErrors) private error: HandleErrors;
  //#endregion

  async execute({ id, data }: UpdateVendingMachineDTO) {
    await this.checkMachineExists({ id, data });
    await this.checkMachineNameHasUsed({ id, data });

    this.error.checkErrors();

    return this.updateMachine({ id, data });
  }

  //#region IMPLEMENATION
  private async checkMachineExists({ id }: UpdateVendingMachineDTO) {
    const machine = await this.repository.findById(id);

    if (!machine) this.error.add('Vending machine not found');
  }

  private async checkMachineNameHasUsed({ id, data }: UpdateVendingMachineDTO) {
    const machine = await this.repository.findByName(data.name, id);

    if (machine) this.error.add('Already exists a vending machine with this name');
  }

  private async updateMachine(args: UpdateVendingMachineDTO) {
    const vendingMachine = await this.repository.update(args);
    return {
      vendingMachine,
      message: ['Vending machine updated successfully'],
    };
  }
  //#endregion
}
