import {
  Table,
  Column,
  Model,
  PrimaryKey,
  DataType,
  AutoIncrement,
  BelongsToMany,
} from 'sequelize-typescript';
import { RolePermissionModel } from 'src/role/models/role-permission.model';
import { RoleModel } from 'src/role/models/role.model';

@Table({
  tableName: 'permissions',
})
export class PermissionModel extends Model {
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

  @BelongsToMany(() => RoleModel, () => RolePermissionModel)
  roles: RoleModel[];
}
