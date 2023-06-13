import { Injectable } from '@nestjs/common';
import { UserModel } from './user.model';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserModel)
    private userRepository: typeof UserModel,
  ) {}

  async findAll(): Promise<UserModel[]> {
    return this.userRepository.findAll();
  }

  async create(data): Promise<UserModel> {
    const user: UserModel = new UserModel();
    user.email = data.email;
    user.first_name = data.first_name;
    user.last_name = data.last_name;
    const hash = await bcrypt.hash(data.password, 12);
    user.password = hash;

    return user.save();
  }
}
