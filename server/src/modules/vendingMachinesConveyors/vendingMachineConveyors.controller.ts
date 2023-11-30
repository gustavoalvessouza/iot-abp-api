import { Controller, Inject, Put, Body, Post, Delete, Param } from '@nestjs/common';

import {
  AddProductConveyorsDTO,
  CreateConveyorsDTO,
  DeleteConveyorsDTO,
  RemoveProductConveyorsDTO,
  UpdateConveyorsDTO,
} from './dto';

import {
  CreateConveyorsUseCase,
  UpdateConveyorsUseCase,
  DeleteConveyorsUseCase,
  AddProductUseCase,
  RemoveProductUseCase,
} from './use-case';

@Controller('conveyors')
export class VendingMachineConveyorsController {
  //#region DEPENDENCIES
  @Inject(CreateConveyorsUseCase) private createUseCase: CreateConveyorsUseCase;

  @Inject(UpdateConveyorsUseCase) private updateUseCase: UpdateConveyorsUseCase;

  @Inject(DeleteConveyorsUseCase) private deleteUseCase: DeleteConveyorsUseCase;

  @Inject(AddProductUseCase)
  private addProductUseCase: AddProductUseCase;

  @Inject(RemoveProductUseCase) private removeProductUseCase: RemoveProductUseCase;

  //#endregion

  @Post()
  async create(@Body() body: CreateConveyorsDTO) {
    return this.createUseCase.execute(body);
  }

  @Put()
  async update(@Body() body: UpdateConveyorsDTO) {
    return await this.updateUseCase.execute(body);
  }

  @Put('/add-product')
  async addProduct(@Body() body: AddProductConveyorsDTO) {
    return await this.addProductUseCase.execute(body);
  }
  @Put('/remove-product/:id')
  async removeProduct(@Param() param: RemoveProductConveyorsDTO) {
    return await this.removeProductUseCase.execute(param);
  }

  @Delete(':id')
  async delete(@Param() params: DeleteConveyorsDTO) {
    return await this.deleteUseCase.execute(params);
  }
}
