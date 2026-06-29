import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Public()
  // @Get(':username')
  // findOne(@Param('username') username: string): Promise<User | undefined> {
  //   return this.usersService.findOne(username);
  // }

  // @Get()
  // @Roles(Role.ADMIN)
  // findAll() {
  //   return this.usersService.findAll();
  // }
}
