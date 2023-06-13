import { BadRequestException, Injectable } from '@nestjs/common';
import { UserModel } from './user.model';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from 'src/auth/models/register.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserModel)
    private userRepository: typeof UserModel,
  ) {}

  async findAll(): Promise<UserModel[]> {
    return this.userRepository.findAll();
  }

  async create(registerDto: RegisterDto): Promise<UserModel> {
    const user: UserModel = new UserModel();

    if (registerDto.password !== registerDto.confirm_password) {
      throw new BadRequestException('Password does not match');
    }

    user.email = registerDto.email;
    user.first_name = registerDto.first_name;
    user.last_name = registerDto.last_name;
    const hash = await bcrypt.hash(registerDto.password, 12);
    user.password = hash;
    return user.save();
  }
}
