import { Inject, Injectable } from '@nestjs/common';
import { VendingMachineRepository, VendingMachineConveyorsRepository } from 'src/repositories';

import { HandleErrors } from 'src/utils/handleErrors';
import { UpdateConveyorsDTO } from '../dto';

@Injectable()
export class UpdateConveyorsUseCase {
  //#region DEPENDENCIES
  @Inject(VendingMachineConveyorsRepository) private repository: VendingMachineConveyorsRepository;

  @Inject(VendingMachineRepository) private vendingMachineRepository: VendingMachineRepository;

  @Inject(HandleErrors) private error: HandleErrors;
  //#endregion

  async execute({ id, data }: UpdateConveyorsDTO) {
    await this.checkMachineExists({ id, data });
    await this.checkEspIpAlreadyUsed({ id, data });

    this.error.checkErrors();

    return this.updateConveyor({ id, data });
  }

  //#region IMPLEMENATION
  private async checkMachineExists({ data }: UpdateConveyorsDTO) {
    const machine = await this.vendingMachineRepository.findById(data.vendingMachineId);

    if (!machine) this.error.add('Vending machine not found');
  }

  private async checkEspIpAlreadyUsed({ id, data }: UpdateConveyorsDTO) {
    const conveyors = await this.repository.findByEspIp(data.espIp, id);

    if (conveyors) this.error.add('Esp Ip already used');
  }

  private async updateConveyor(args: UpdateConveyorsDTO) {
    const conveyor = await this.repository.update(args);
    return {
      conveyor,
      message: ['Vending machine conveyor updated successfully'],
    };
  }
  //#endregion
}
