import { Injectable } from '@nestjs/common';

@Injectable()
export class Masks {
  BRL(value: string) {
    return (Number(value.replace(/[^0-9]*/g, '')) / 100)
      .toLocaleString('pt-br', {
        style: 'currency',
        currency: 'BRL',
      })
      .substring(0, 30);
  }

  unMask(value: string | number) {
    return String(value).replace(/[^0-9]/g, '');
  }
}
