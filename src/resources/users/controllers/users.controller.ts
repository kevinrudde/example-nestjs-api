import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { Observable } from 'rxjs';
import { User } from '../entities/user.entity';

@Controller('users')
export class UsersController {

  constructor(
    private usersService: UsersService,
  ) {}

  @Get()
  findAll(): Observable<User[]> {
    return this.usersService.findAll();
  }

  @Post()
  create(@Body() user: User): Observable<User> {
    return this.usersService.create(user);
  }
}
