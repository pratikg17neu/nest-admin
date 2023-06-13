import { IsNotEmpty } from 'class-validator';
import { PermissionModel } from 'src/permission/models/permission.model';

export class RoleDto {
  @IsNotEmpty()
  name: string;

  permissions: PermissionModel[];
}
