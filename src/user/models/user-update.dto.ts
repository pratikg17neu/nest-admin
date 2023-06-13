import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserUpdateDto {
  @IsEmail()
  email?: string;
  first_name?: string;
  last_name?: string;
}
