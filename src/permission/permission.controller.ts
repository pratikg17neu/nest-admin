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
import { PermissionService } from './permission.service';
import { PermissionModel } from './models/permission.model';
import { AuthGuard } from 'src/auth/auth.guard';
import { RoleDto } from 'src/role/models/role-create.dto';

@Controller('permissions')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Get()
  async all(): Promise<PermissionModel[]> {
    return this.permissionService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async getOne(@Param('id') id: string): Promise<PermissionModel> {
    return await this.permissionService.findPermissionById(id);
  }

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() body: RoleDto): Promise<PermissionModel> {
    return await this.permissionService.create(body);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() body: RoleDto,
  ): Promise<PermissionModel> {
    return await this.permissionService.update(id, body);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.permissionService.delete(id);
  }
}
