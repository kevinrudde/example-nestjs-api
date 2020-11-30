import { NestException } from '../../../core/exception/nest.exception';

export class ProfilesException extends NestException {

  public static ALREADY_EXISTS = 1;

  public static NOT_FOUND = 2;

  constructor(code: number) {
    let message: string;
    let status: number;

    switch (code) {
      case ProfilesException.ALREADY_EXISTS:
        status = 400;
        message = 'Profile already exists';
        break;
      case ProfilesException.NOT_FOUND:
        status = 400;
        message = 'Profile not found';
        break;
    }
    super(message, status, code);
  }
}
