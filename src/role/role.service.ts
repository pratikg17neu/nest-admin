import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RoleModel } from './models/role.model';
import { RoleCreateDto } from './models/role-create.dro';

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

  async create(roleCreateDto: RoleCreateDto): Promise<RoleModel> {
    const role: RoleModel = new RoleModel();
    role.name = roleCreateDto.name;
    return role.save();
  }

  async update(id: string, roleDto: RoleCreateDto): Promise<RoleModel> {
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
