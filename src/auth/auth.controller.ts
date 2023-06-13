import { JwtService } from '@nestjs/jwt';
import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { RegisterDto } from './models/register.dto';
import { Response, Request } from 'express';
import { AuthGuard } from './auth.guard';
@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.registerUser(registerDto);
  }

  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.loginUser(email, password, res);
  }

  @UseGuards(AuthGuard)
  @Get('user')
  async user(@Req() req: Request) {
    const cookie = req.cookies['jwt'];

    const data = await this.jwtService.verifyAsync(cookie);
    return this.authService.getUser(data.id);
  }

  @UseGuards(AuthGuard)
  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('jwt');

    return {
      message: 'Logout success',
    };
  }
}
