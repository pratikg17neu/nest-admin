import { Module } from '@nestjs/common';
import { PermissionController } from './permission.controller';
import { PermissionService } from './permission.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { PermissionModel } from './models/permission.model';

@Module({
  imports: [SequelizeModule.forFeature([PermissionModel])],
  controllers: [PermissionController],
  providers: [PermissionService],
})
export class PermissionModule {}
