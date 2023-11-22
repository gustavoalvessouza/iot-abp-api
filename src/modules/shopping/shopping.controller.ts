import { Controller, Inject, Body, Post } from '@nestjs/common';

import { RegisterShoppingDTO } from './dto';

import { RegisterShoppingUseCase } from './use-case';

@Controller('shoppings')
export class productController {
  //#region DEPENDENCIES
  @Inject(RegisterShoppingUseCase) private registerShoppingUseCase: RegisterShoppingUseCase;

  //#endregion

  @Post()
  async register(@Body() body: RegisterShoppingDTO) {
    console.log(body);
    return this.registerShoppingUseCase.execute({ data: body });
  }
}
