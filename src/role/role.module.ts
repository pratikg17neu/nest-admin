import { Module } from '@nestjs/common';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { RoleModel } from './models/role.model';
import { RolePermissionModel } from './models/role-permission.model';
import { PermissionModel } from 'src/permission/models/permission.model';

@Module({
  imports: [
    SequelizeModule.forFeature([
      PermissionModel,
      RolePermissionModel,
      RoleModel,
    ]),
  ],
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule {}
