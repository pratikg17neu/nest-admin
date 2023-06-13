import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { PermissionModel } from './models/permission.model';
import { PermissionDto } from './models/permission.dto';

@Injectable()
export class PermissionService {
  constructor(
    @InjectModel(PermissionModel)
    private readonly permissionRepository: typeof PermissionModel,
  ) {}

  async findAll(): Promise<PermissionModel[]> {
    return this.permissionRepository.findAll();
  }

  getPermission(id: string): Promise<PermissionModel> {
    return this.findPermissionById(id);
  }

  async create(permissionDto: PermissionDto): Promise<PermissionModel> {
    const permission: PermissionModel = new PermissionModel();
    permission.name = permissionDto.name;
    return permission.save();
  }

  async update(
    id: string,
    permissionDto: PermissionDto,
  ): Promise<PermissionModel> {
    const permission = await this.findPermissionById(id);
    permission.name = permissionDto.name;
    return permission.save();
  }

  async delete(id: string) {
    return this.permissionRepository.destroy({ where: { id: id } });
  }

  async findPermissionById(id: string) {
    return this.permissionRepository.findOne({ where: { id: id } });
  }
}
