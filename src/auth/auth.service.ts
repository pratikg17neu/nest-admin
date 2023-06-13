import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterDto } from './models/register.dto';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async registerUser(data: RegisterDto) {
    return this.userService.register(data);
  }

  async loginUser(email: string, password: string, res: Response) {
    return this.userService.loginUser(email, password, res);
  }

  async getUser(id: string) {
    const user = (await this.userService.getUser(id)).toJSON();
    delete user.password;
    return user;
  }
}
