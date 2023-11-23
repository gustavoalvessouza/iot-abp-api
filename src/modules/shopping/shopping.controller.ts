import { Controller, Inject, Body, Post, Get, Param } from '@nestjs/common';

import { RegisterShoppingDTO, CheckHasShoppingDTO } from './dto';

import { CheckHasShoppingUseCase, RegisterShoppingUseCase } from './use-case';

@Controller('shoppings')
export class productController {
  //#region DEPENDENCIES
  @Inject(RegisterShoppingUseCase) private registerShoppingUseCase: RegisterShoppingUseCase;
  @Inject(CheckHasShoppingUseCase) private checkHasShoppingUseCase: CheckHasShoppingUseCase;

  //#endregion

  @Post()
  async register(@Body() body: RegisterShoppingDTO) {
    console.log(body);
    return this.registerShoppingUseCase.execute({ data: body });
  }

  @Get(':machineId')
  async checkHasShopping(@Param() param: CheckHasShoppingDTO) {
    console.log(param);
    return this.checkHasShoppingUseCase.execute(param);
  }
}
