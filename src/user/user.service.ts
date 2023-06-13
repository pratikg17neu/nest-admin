import { Injectable } from '@nestjs/common';
import { UserModel } from './user.model';
import { InjectModel } from '@nestjs/sequelize';

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
    user.password = data.password;

    return user.save();
  }
}
