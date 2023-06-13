import { IsEmail, IsNotEmpty } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  first_name: string;
  @IsNotEmpty()
  last_name: string;
  @IsNotEmpty()
  password: string;
  @IsNotEmpty()
  confirm_password: string;
}
