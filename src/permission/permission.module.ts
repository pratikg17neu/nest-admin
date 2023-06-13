import { Module } from '@nestjs/common';
import { PermissionController } from './permission.controller';
import { PermissionService } from './permission.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { PermissionModel } from './models/permission.model';
import { RolePermissionModel } from 'src/role/models/role-permission.model';
import { RoleModel } from 'src/role/models/role.model';

@Module({
  imports: [
    SequelizeModule.forFeature([
      PermissionModel,
      RolePermissionModel,
      RoleModel,
    ]),
  ],
  controllers: [PermissionController],
  providers: [PermissionService],
})
export class PermissionModule {}
