import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RoleModel } from './models/role.model';

@Injectable()
export class RoleService {
  constructor(
    @InjectModel(RoleModel)
    private readonly roleRepository: typeof RoleModel,
  ) {}
}
