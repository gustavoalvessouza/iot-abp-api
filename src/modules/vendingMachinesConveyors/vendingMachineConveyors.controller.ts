import { Controller, Inject, Put, Body, Post, Delete, Param } from '@nestjs/common';

import {
  CreateVendingMachineConveyorsDTO,
  DeleteVendingMachineConveyorsDTO,
  UpdateVendingMachineConveyorsDTO,
} from './dto';

import {
  UpdateVendingMachineConveyorsUseCase,
  CreateVendingMachineConveyorsUseCase,
  DeleteVendingMachineConveyorsUseCase,
} from './use-case';

@Controller('vending-machine-conveyors')
export class VendingMachineController {
  //#region DEPENDENCIES
  @Inject(CreateVendingMachineConveyorsUseCase) private createUseCase: CreateVendingMachineConveyorsUseCase;

  @Inject(UpdateVendingMachineConveyorsUseCase) private updateUseCase: UpdateVendingMachineConveyorsUseCase;

  @Inject(DeleteVendingMachineConveyorsUseCase) private deleteUseCase: DeleteVendingMachineConveyorsUseCase;
  //#endregion

  @Post()
  async create(@Body() body: CreateVendingMachineConveyorsDTO) {
    return this.createUseCase.execute(body);
  }

  @Put()
  async update(@Body() body: UpdateVendingMachineConveyorsDTO) {
    return await this.updateUseCase.execute(body);
  }

  @Delete(':id')
  async delete(@Param() params: DeleteVendingMachineConveyorsDTO) {
    return await this.deleteUseCase.execute(params);
  }
}
