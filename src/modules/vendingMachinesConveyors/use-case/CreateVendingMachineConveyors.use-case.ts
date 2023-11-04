import { Inject, Injectable } from '@nestjs/common';
import { ProductRepository, VendingMachineRepository, VendingMachineConveyorsRepository } from 'src/repositories';

import { HandleErrors } from 'src/utils/HandleErrors';
import { CreateVendingMachineConveyorsDTO } from '../dto';

@Injectable()
export class CreateVendingMachineConveyorsUseCase {
  //#region DEPENDENCIES
  @Inject(VendingMachineConveyorsRepository) private repository: VendingMachineConveyorsRepository;

  @Inject(ProductRepository) private productRepository: ProductRepository;

  @Inject(VendingMachineRepository) private vendingMachineRepository: VendingMachineRepository;

  @Inject(HandleErrors) private error: HandleErrors;
  //#endregion

  async execute({ data }: CreateVendingMachineConveyorsDTO) {
    await this.checkMachineExists({ data });
    await this.checkProductExists({ data });
    await this.checkEspIpAlreadyUsed({ data });

    this.error.checkErrors();

    return this.createMachine({ data });
  }

  //#region IMPLEMENATION
  private async checkMachineExists({ data }: CreateVendingMachineConveyorsDTO) {
    const machine = await this.vendingMachineRepository.findById(data.vendingMachineId);

    if (!machine) this.error.add('Vending machine not found');
  }

  private async checkProductExists({ data }: CreateVendingMachineConveyorsDTO) {
    const product = await this.productRepository.findById(data.productId);

    if (!product) this.error.add('Product not found');
  }

  private async checkEspIpAlreadyUsed({ data }: CreateVendingMachineConveyorsDTO) {
    const conveyors = await this.repository.findByEspIp(data.espIp);

    if (conveyors) this.error.add('Esp Ip already used');
  }

  private async createMachine({ data }: CreateVendingMachineConveyorsDTO) {
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
