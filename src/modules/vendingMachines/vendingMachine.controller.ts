import { Controller, Inject, Put, Body, Post, Delete, Param, Get, Query } from '@nestjs/common';

import {
  CreateVendingMachineDTO,
  DeleteVendingMachineDTO,
  FindAllVendingMachineDTO,
  UpdateVendingMachineDTO,
} from './dto';

import {
  UpdateVendingMachineUseCase,
  CreateVendingMachineUseCase,
  DeleteVendingMachineUseCase,
  FindAllVendingMachineUseCase,
} from './use-case';

@Controller('vending-machines')
export class VendingMachineController {
  //#region DEPENDENCIES
  @Inject(CreateVendingMachineUseCase) private createUseCase: CreateVendingMachineUseCase;

  @Inject(UpdateVendingMachineUseCase) private updateUseCase: UpdateVendingMachineUseCase;

  @Inject(FindAllVendingMachineUseCase) private findAllUseCase: FindAllVendingMachineUseCase;

  @Inject(DeleteVendingMachineUseCase) private deleteUseCase: DeleteVendingMachineUseCase;
  //#endregion

  @Post()
  async create(@Body() body: CreateVendingMachineDTO) {
    return this.createUseCase.execute(body);
  }

  @Put()
  async update(@Body() body: UpdateVendingMachineDTO) {
    return await this.updateUseCase.execute(body);
  }

  @Get()
  async findAll(@Query() query: FindAllVendingMachineDTO) {
    return await this.findAllUseCase.execute(query);
  }

  @Delete(':machineId')
  async delete(@Param() params: DeleteVendingMachineDTO) {
    console.log(params);
    return await this.deleteUseCase.execute(params);
  }
}
