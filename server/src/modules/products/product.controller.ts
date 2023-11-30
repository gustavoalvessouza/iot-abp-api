import { Controller, Inject, Put, Body, Post, Delete, Param, Get, Query } from '@nestjs/common';

import { CreateProductDTO, DeleteProductDTO, FindAllProductDTO, UpdateProductDTO } from './dto';

import { CreateProductUseCase, UpdateProductUseCase, FindAllProductUseCase, DeleteProductUseCase } from './use-case';

@Controller('products')
export class productController {
  //#region DEPENDENCIES
  @Inject(CreateProductUseCase) private createUseCase: CreateProductUseCase;

  @Inject(UpdateProductUseCase) private updateUseCase: UpdateProductUseCase;

  @Inject(FindAllProductUseCase) private findAllUseCase: FindAllProductUseCase;

  @Inject(DeleteProductUseCase) private deleteUseCase: DeleteProductUseCase;
  //#endregion

  @Post()
  async create(@Body() body: CreateProductDTO) {
    return this.createUseCase.execute(body);
  }

  @Put()
  async update(@Body() body: UpdateProductDTO) {
    return await this.updateUseCase.execute(body);
  }

  @Get()
  async findAll(@Query() query: FindAllProductDTO) {
    return await this.findAllUseCase.execute(query);
  }

  @Delete(':id')
  async delete(@Param() params: DeleteProductDTO) {
    return await this.deleteUseCase.execute(params);
  }
}
