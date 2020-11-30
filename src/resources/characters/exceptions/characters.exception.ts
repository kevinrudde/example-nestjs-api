import { NestException } from '../../../core/exception/Nest.exception';

export class CharactersException extends NestException {

  public static NOT_FOUND = 1;

  constructor(code: number) {
    let message: string;
    let status: number;

    switch (code) {
      case CharactersException.NOT_FOUND:
        status = 400;
        message = 'Character not found';
        break;
    }
    super(message, status, code);
  }
}
