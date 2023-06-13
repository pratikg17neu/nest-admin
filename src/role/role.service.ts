import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RoleModel } from './models/role.model';
import { RoleDto } from './models/role-create.dto';
import { PermissionModel } from 'src/permission/models/permission.model';

@Injectable()
export class RoleService {
  constructor(
    @InjectModel(RoleModel)
    private readonly roleRepository: typeof RoleModel,
    @InjectModel(PermissionModel)
    private readonly permissionRepository: typeof PermissionModel,
  ) {}

  async findAll(): Promise<RoleModel[]> {
    return this.roleRepository.findAll();
  }

  getRole(id: string): Promise<RoleModel> {
    return this.findRoleById(id);
  }

  async create(roleDto: RoleDto): Promise<RoleModel> {
    const role: RoleModel = new RoleModel();
    role.name = roleDto.name;
    const foundPermissions = await this.permissionRepository.findAll({
      where: { id: roleDto.permissions },
    });
    await role.save();

    role.permissions = roleDto.permissions;
    await role.$set('permissions', foundPermissions);

    return role;
  }

  async update(id: string, roleDto: RoleDto): Promise<RoleModel> {
    const role = await this.getRole(id);
    role.name = roleDto.name;
    return role.save();
  }

  async delete(id: string) {
    return this.roleRepository.destroy({ where: { id: id } });
  }

  async findRoleById(id: string) {
    return this.roleRepository.findOne({ where: { id: id } });
  }
}
