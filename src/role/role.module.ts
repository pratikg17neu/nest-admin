import { Module } from '@nestjs/common';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { RoleModel } from './models/role.model';

@Module({
  imports: [SequelizeModule.forFeature([RoleModel])],
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule {}
