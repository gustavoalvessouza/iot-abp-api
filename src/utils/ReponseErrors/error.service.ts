import { Injectable } from '@nestjs/common';

@Injectable()
export class ErrorService {
  #errors: string[] = [];

  add(error: string) {
    this.#errors.push(error);
  }

  get errors() {
    return this.#errors;
  }
}
