import { NestException } from '../../../core/exception/Nest.exception';

export class InventoriesException extends NestException {

  public static NOT_FOUND = 1;

  constructor(code: number) {
    let message: string;
    let status: number;

    switch (code) {
      case InventoriesException.NOT_FOUND:
        status = 400;
        message = 'Inventory not found';
        break;
    }
    super(message, status, code);
  }
}
