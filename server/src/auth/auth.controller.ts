import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Request,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signin.dto';
import type { AuthRequest } from '../common/types';
import { Public } from '../common/decorators/public.decorator';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @Public()
  // @HttpCode(HttpStatus.OK)
  // @Post('login')
  // async signIn(@Body() signInDto: SignInDto) {
  //   console.log(signInDto);
  //   return this.authService.authenticate(
  //     signInDto.username,
  //     signInDto.password,
  //   );
  // }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req: AuthRequest) {
    return req.user;
  }
}
