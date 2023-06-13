import {
  Table,
  Column,
  Model,
  PrimaryKey,
  DataType,
  AutoIncrement,
} from 'sequelize-typescript';

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
}
