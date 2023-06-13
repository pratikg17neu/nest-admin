import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RoleModel } from './models/role.model';
import { RoleDto } from './models/role-create.dto';

@Injectable()
export class RoleService {
  constructor(
    @InjectModel(RoleModel)
    private readonly roleRepository: typeof RoleModel,
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
    return role.save();
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
