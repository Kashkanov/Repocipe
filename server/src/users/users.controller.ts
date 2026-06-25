import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../common/enums/role.enum';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Public()
  // @Get(':username')
  // findOne(@Param('username') username: string): Promise<User | undefined> {
  //   return this.usersService.findOne(username);
  // }

  @Get()
  @Roles(Role.ADMIN)
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }
}
