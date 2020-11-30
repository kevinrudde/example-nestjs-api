import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable, of } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {

  private API_TOKEN = '<placehodler>';

  constructor(
    private readonly reflector: Reflector,
  ) {}

  canActivate(context: ExecutionContext): Observable<boolean> {
    const isPublic = this.reflector.get<boolean>('isPublic', context.getHandler());

    if (isPublic) {
      return of(true);
    }

    const request = context.switchToHttp().getRequest();
    let token: string;

    if (request.headers.hasOwnProperty('nest-token')) {
      try {
        token = request.headers['nest-token'];

        if (token === this.API_TOKEN) {
          return of(true);
        }
      } catch (error) {
        throw new UnauthorizedException();
      }
    }

    return of(false);
  }
}
