import {
  Model,
  Table,
  PrimaryKey,
  AutoIncrement,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { PermissionModel } from 'src/permission/models/permission.model';
import { RoleModel } from './role.model';

@Table({
  tableName: 'role_permission',
})
export class RolePermissionModel extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  id: number;

  @ForeignKey(() => RoleModel)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  role_id: string;

  @BelongsTo(() => RoleModel)
  role: RoleModel;

  @ForeignKey(() => PermissionModel)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  permission_id: string;

  @BelongsTo(() => PermissionModel)
  permission: PermissionModel;
}
