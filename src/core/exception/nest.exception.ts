import { HttpException } from '@nestjs/common';

export class NestException extends HttpException {

  code: number;

  constructor(message: string, status: number, code: number) {
    super(message, status);

    this.code = code;
  }
}
