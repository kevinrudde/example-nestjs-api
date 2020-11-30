import { Get, Injectable, Post } from '@nestjs/common';
import { UsersRepository } from '../repositories/users.repository';
import { Observable } from 'rxjs';
import { User } from '../entities/user.entity';
import { tap } from 'rxjs/operators';

@Injectable()
export class UsersService {

  constructor(
    private usersRepository: UsersRepository,
  ) {}

  findAll(): Observable<User[]> {
    return this.usersRepository.findAll();
  }

  create(user: User): Observable<User> {
    return this.usersRepository.create(user);
  }
}
