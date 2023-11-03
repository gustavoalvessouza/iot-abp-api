import { Inject, Injectable } from '@nestjs/common';
import { VendingMachineUseCase } from './use-case/';
import { VendingMachineRepository } from '../../repositories/vendingMachines';

import {
  CreateVendingMachineDTO,
  UpdateVendingMachineDTO,
} from './domain/dto/vendingMachine.dto';
import { IVendingMachineUpdateServiceReturn } from './types/service.types';

@Injectable()
export class VendingMachineService {
  constructor(
    @Inject(VendingMachineRepository)
    private repository: VendingMachineRepository,

    @Inject(VendingMachineUseCase)
    private useCase: VendingMachineUseCase,
  ) {}

  async create(data: CreateVendingMachineDTO) {
    return this.repository.create({ data });
  }

  async update(
    data: UpdateVendingMachineDTO,
  ): Promise<IVendingMachineUpdateServiceReturn> {
    const { machineId, location, name } = data;

    // #region USE CASE
    const errors = await this.useCase.execute({ machineId: machineId });

    if (errors.length > 0) return { result: null, errors };
    // #endregion

    const result = await this.repository.update({
      data: {
        name: name,
        location: location,
      },
      where: { id: machineId },
    });

    return {
      result,
      errors,
    };
  }
}
