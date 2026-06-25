import { AuthService } from './auth.service';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Request as ExpressRequest } from 'express';
import { PassportLocalGuard } from './guards/passport-local.guard';
import { Public } from '../common/decorators/public.decorator';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RegisterDto } from './dto/register.dto';
import { Role } from '../common/enums/role.enum';

interface AuthenticatedRequest extends ExpressRequest {
  user?: {
    userId: string;
    username: string;
    role: Role;
  };
}

@Controller('auth-v2')
export class PassportAuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  @UseGuards(PassportLocalGuard)
  login(@Request() req: AuthenticatedRequest) {
    if (!req.user) {
      return null;
    }
    return this.authService.signIn(
      req.user.userId,
      req.user.username,
      req.user.role,
    );
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    console.log(registerDto);
    return this.authService.create(registerDto);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  getUserInfo(@Request() req: AuthenticatedRequest) {
    if (!req.user) {
      return null;
    }
    return req.user;
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('logout')
  async logout() {
    return this.authService.logout();
  }
}
