import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { RegisterDto } from './models/register.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.registerUser(registerDto);
  }
}
