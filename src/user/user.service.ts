import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserModel } from './user.model';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from 'src/auth/models/register.dto';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserModel)
    private userRepository: typeof UserModel,
    private jwtService: JwtService,
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

  async loginUser(email: string, password: string, res: Response) {
    const user = await this.findUserByEmail(email);

    if (!user) {
      return new NotFoundException('User not found');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new BadRequestException('Password doest match');
    }
    const payload = { id: user.id };
    const token = await this.jwtService.signAsync(payload);
    res.cookie('jwt', token, { httpOnly: true });

    return {
      ...user.dataValues,
      token: token,
    };
  }

  async findUserByEmail(email: string) {
    return this.userRepository.findOne({ where: { email: email } });
  }
}
