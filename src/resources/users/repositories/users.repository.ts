import { Get, Injectable, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { from, Observable } from 'rxjs';

@Injectable()
export class UsersRepository {
  
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>
  ) {}

  @Get()
  findAll(): Observable<User[]> {
    return from(this.usersRepository.find());
  }

  @Post()
  create(user: User): Observable<User> {
    return from(this.usersRepository.save(user));
  }
}
