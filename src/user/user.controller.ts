import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserModel } from './models/user.model';
import { UserCreateDto } from './models/user-create.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserUpdateDto } from './models/user-update.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async all(@Query('page') page: number): Promise<UserModel[]> {
    return await this.userService.paginate(page);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async getOne(@Param('id') id: string): Promise<UserModel> {
    return await this.userService.findUserById(id);
  }

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() body: UserCreateDto): Promise<UserModel> {
    return await this.userService.create(body);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() body: UserUpdateDto,
  ): Promise<UserModel> {
    return await this.userService.update(id, body);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.userService.delete(id);
  }
}
