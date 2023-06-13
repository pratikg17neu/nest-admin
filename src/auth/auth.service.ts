import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterDto } from './models/register.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async registerUser(data: RegisterDto) {
    return this.userService.create(data);
  }
}
