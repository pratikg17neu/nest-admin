import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { RoleModel } from './models/role.model';
import { RoleService } from './role.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { RoleDto } from './models/role-create.dto';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  async all(): Promise<RoleModel[]> {
    return this.roleService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async getOne(@Param('id') id: string): Promise<RoleModel> {
    return await this.roleService.findRoleById(id);
  }

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() body: RoleDto): Promise<RoleModel> {
    return await this.roleService.create(body);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() body: RoleDto,
  ): Promise<RoleModel> {
    return await this.roleService.update(id, body);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.roleService.delete(id);
  }
}
