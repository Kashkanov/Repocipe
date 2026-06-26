import { AuthService } from './auth.service';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request as ExpressRequest } from 'express';
import { PassportLocalGuard } from './guards/passport-local.guard';
import { Public } from '../common/decorators/public.decorator';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RegisterDto } from './dto/register.dto';
import { Role } from '../common/enums/role.enum';
import type { Response } from 'express';

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
  async login(
    @Request() req: AuthenticatedRequest,
    @Res({ passthrough: true }) res: Response,
  ) {
    if (!req.user) {
      return null;
    }
    const { access_token } = await this.authService.signIn(
      req.user.userId,
      req.user.username,
      req.user.role,
    );

    res.cookie('token', access_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 1000 * 60, // 1 minute
    });

    return { message: 'Login successful' };
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
  async logout(@Res({ passthrough: true }) res: Response) {
    await this.authService.logout();
    res.clearCookie('token');
    return { message: 'Logout successful' };
  }
}
