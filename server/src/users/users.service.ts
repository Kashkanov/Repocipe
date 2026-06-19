import { Injectable } from '@nestjs/common';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  private readonly users = [
    {
      username: 'admin',
      password: 'admin',
    },
    {
      username: 'user',
      password: 'user',
    },
  ];

  findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
