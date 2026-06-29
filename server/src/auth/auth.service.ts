import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { Role } from '../common/enums/role.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (!user) {
      return null;
    }
    const isMatch = await bcrypt.compare(pass, user.password);
    if (user && isMatch) {
      const { password, ...result } = user;
      console.log('validate: ', result);
      return result;
    }
    return null;
  }

  async signIn(
    userId: string,
    username: string,
    role: Role,
  ): Promise<{ access_token: string }> {
    const payload = { sub: userId, username, role };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async create(dto: RegisterDto) {
    console.log(dto);
    return this.usersService.create(dto);
  }

  async logout(): Promise<void> {
    await this.jwtService.signAsync({});
  }
}
