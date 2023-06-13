import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { UserModel } from './user.model';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async all(): Promise<UserModel[]> {
    return await this.userService.findAll();
  }
}
