import { Inject, Injectable } from '@nestjs/common';
import { VendingMachineRepository } from 'src/repositories/vendingMachines';

import { FindAllVendingMachineDTO } from '../dto';

@Injectable()
export class FindAllVendingMachineUseCase {
  //#region DEPENDENCIES
  @Inject(VendingMachineRepository) private repository: VendingMachineRepository;

  //#endregion

  async execute({ take, page }: FindAllVendingMachineDTO) {
    return this.findAllMachines({ page, take });
  }

  //#region IMPLEMENATION
  private async findAllMachines({ page, take }: FindAllVendingMachineDTO) {
    return this.repository.findAll({ take, page });
  }
  //#endregion
}
