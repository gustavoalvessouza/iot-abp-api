import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class HandleErrors {
  #errors: string[] = [];

  add(error: string) {
    this.#errors.push(error);
  }

  get errors() {
    return this.#errors;
  }

  private clear() {
    this.#errors = [];
  }

  checkErrors() {
    if (this.#errors.length > 0) {
      const message = structuredClone(this.errors);
      this.clear();

      throw new HttpException({ message }, HttpStatus.BAD_REQUEST);
    }
  }
}
