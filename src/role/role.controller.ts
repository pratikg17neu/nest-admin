import { Controller, Get } from '@nestjs/common';
import { RoleModel } from './models/role.model';
import { RoleService } from './role.service';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  async all(): Promise<RoleModel[]> {
    return this.roleService.findAll();
  }
}
