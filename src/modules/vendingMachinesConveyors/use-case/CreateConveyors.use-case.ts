import { Inject, Injectable } from '@nestjs/common';
import { VendingMachineRepository, VendingMachineConveyorsRepository } from 'src/repositories';

import { HandleErrors } from 'src/utils/handleErrors';
import { CreateConveyorsDTO } from '../dto';

@Injectable()
export class CreateConveyorsUseCase {
  //#region DEPENDENCIES
  @Inject(VendingMachineConveyorsRepository) private repository: VendingMachineConveyorsRepository;

  @Inject(VendingMachineRepository) private vendingMachineRepository: VendingMachineRepository;

  @Inject(HandleErrors) private error: HandleErrors;
  //#endregion

  async execute({ data }: CreateConveyorsDTO) {
    await this.checkMachineExists({ data });
    // await this.checkProductExists({ data });
    await this.checkEspIpAlreadyUsed({ data });

    this.error.checkErrors();

    return this.createConveyor({ data });
  }

  //#region IMPLEMENATION
  private async checkMachineExists({ data }: CreateConveyorsDTO) {
    const machine = await this.vendingMachineRepository.findById(data.vendingMachineId);

    if (!machine) this.error.add('Vending machine not found');
  }

  private async checkEspIpAlreadyUsed({ data }: CreateConveyorsDTO) {
    const conveyors = await this.repository.findByEspIp(data.espIp);

    if (conveyors) this.error.add('Esp Ip already used');
  }

  private async createConveyor({ data }: CreateConveyorsDTO) {
    const conveyor = await this.repository.create({
      data,
    });

    return {
      conveyor,
      message: ['Vending machine created successfully'],
    };
  }
  //#endregion
}
