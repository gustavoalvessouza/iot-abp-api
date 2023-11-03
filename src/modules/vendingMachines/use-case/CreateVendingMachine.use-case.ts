import { Inject, Injectable } from '@nestjs/common';
import { VendingMachineRepository } from 'src/repositories';

import { HandleErrors } from 'src/utils/HandleErrors';
import { CreateVendingMachineDTO } from '../dto';

@Injectable()
export class CreateVendingMachineUseCase {
  //#region DEPENDENCIES
  @Inject(VendingMachineRepository) private repository: VendingMachineRepository;

  @Inject(HandleErrors) private error: HandleErrors;
  //#endregion

  async execute({ data }: CreateVendingMachineDTO) {
    await this.checkMachineExists({ data });

    this.error.checkErrors();

    return this.createMachine({ data });
  }

  //#region IMPLEMENATION
  private async checkMachineExists({ data }: CreateVendingMachineDTO) {
    const machine = await this.repository.findByName(data.name);

    if (machine) this.error.add('Already exists a vending machine with this name');
  }

  private async createMachine({ data }: CreateVendingMachineDTO) {
    const vendingMachine = await this.repository.create({
      data,
    });

    return {
      vendingMachine,
      message: ['Vending machine created successfully'],
    };
  }
  //#endregion
}
