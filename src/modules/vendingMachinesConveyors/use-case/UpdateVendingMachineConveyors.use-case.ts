import { Inject, Injectable } from '@nestjs/common';
import { ProductRepository, VendingMachineRepository, VendingMachineConveyorsRepository } from 'src/repositories';

import { HandleErrors } from 'src/utils/HandleErrors';
import { UpdateVendingMachineConveyorsDTO } from '../dto';

type NewType = ProductRepository;

@Injectable()
export class UpdateVendingMachineConveyorsUseCase {
  //#region DEPENDENCIES
  @Inject(VendingMachineConveyorsRepository) private repository: VendingMachineConveyorsRepository;

  @Inject(ProductRepository) private productRepository: NewType;

  @Inject(VendingMachineRepository) private vendingMachineRepository: VendingMachineRepository;

  @Inject(HandleErrors) private error: HandleErrors;
  //#endregion

  async execute({ id, data }: UpdateVendingMachineConveyorsDTO) {
    await this.checkMachineExists({ id, data });
    await this.checkProductExists({ id, data });
    await this.checkEspIpAlreadyUsed({ id, data });

    this.error.checkErrors();

    return this.updateConveyor({ id, data });
  }

  //#region IMPLEMENATION
  private async checkMachineExists({ data }: UpdateVendingMachineConveyorsDTO) {
    const machine = await this.vendingMachineRepository.findById(data.vendingMachineId);

    if (!machine) this.error.add('Vending machine not found');
  }

  private async checkProductExists({ data }: UpdateVendingMachineConveyorsDTO) {
    const product = await this.productRepository.findById(data.productId);

    if (!product) this.error.add('Product not found');
  }

  private async checkEspIpAlreadyUsed({ id, data }: UpdateVendingMachineConveyorsDTO) {
    const conveyors = await this.repository.findByEspIp(data.espIp, id);

    if (conveyors) this.error.add('Esp Ip already used');
  }

  private async updateConveyor(args: UpdateVendingMachineConveyorsDTO) {
    const vendingMachine = await this.repository.update(args);
    return {
      vendingMachine,
      message: ['Vending machine conveyor updated successfully'],
    };
  }
  //#endregion
}
