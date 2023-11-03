import { Controller, Inject, Put, Body, Post } from '@nestjs/common';
import { CreateVendingMachineDTO, UpdateVendingMachineDTO } from './dto';
import { UpdateVendingMachineUseCase, CreateVendingMachineUseCase } from './use-case';

@Controller('vending-machines')
export class VendingMachineController {
  //#region DEPENDENCIES
  @Inject(UpdateVendingMachineUseCase) private updateUseCase: UpdateVendingMachineUseCase;

  @Inject(CreateVendingMachineUseCase) private createUserCase: CreateVendingMachineUseCase;
  //#endregion

  @Post()
  async create(@Body() body: CreateVendingMachineDTO) {
    return this.createUserCase.execute(body);
  }

  @Put()
  async update(@Body() body: UpdateVendingMachineDTO) {
    return await this.updateUseCase.execute(body);
  }
}
