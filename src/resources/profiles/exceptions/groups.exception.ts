import { NestException } from '../../../core/exception/Nest.exception';

export class GroupsException extends NestException {

  public static NO_DEFAULT_GROUP = 1;
  public static GROUP_NOT_FOUND = 2;

  constructor(code: number) {
    let message: string;
    let status: number;

    switch (code) {
      case GroupsException.NO_DEFAULT_GROUP:
        status = 400;
        message = 'Could not find default group';
        break;
      case GroupsException.GROUP_NOT_FOUND:
        status = 400;
        message  = 'Could not find group';
        break;
    }
    super(message, status, code);
  }
}
