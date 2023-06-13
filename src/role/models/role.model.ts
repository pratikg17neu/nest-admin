import {
  Table,
  Column,
  Model,
  PrimaryKey,
  DataType,
  AutoIncrement,
  BelongsToMany,
} from 'sequelize-typescript';
import { PermissionModel } from 'src/permission/models/permission.model';
import { RolePermissionModel } from './role-permission.model';

@Table({
  tableName: 'roles',
})
export class RoleModel extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  id: number;

  @Column({
    type: DataType.STRING,
  })
  name: string;

  @BelongsToMany(() => PermissionModel, () => RolePermissionModel)
  permissions: PermissionModel[];
}
