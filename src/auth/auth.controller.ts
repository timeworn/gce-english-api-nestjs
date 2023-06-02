import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { LoginResponse } from './login-response';
import { LoginRequest } from './login-request';
import { User } from '../user/user.entity';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {

  constructor(
    private readonly authService: AuthService
  ) {
  }

  @UseGuards(AuthGuard('local'))
  @ApiOkResponse({type: LoginResponse})
  @Post('login')
  async login(@Body() body: LoginRequest, @Request() req) {
    return this.authService.login(req.user);
  }

  @ApiBearerAuth()
  @ApiOkResponse({type: User})
  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

}
