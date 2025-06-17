import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { User } from "./user.model";
import { InjectModel } from "@nestjs/sequelize";
import { CreateUserDto } from "./dto/create-user.dto";
import bcrypt from "bcryptjs";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  async createUser({ password, email }: CreateUserDto) {
    const user = await this.getUserByEmail(email);

    if (user) {
      throw new HttpException("User already exists!", HttpStatus.CONFLICT);
    }

    const hashedPassword = await bcrypt.hash(password, 5);
    return await this.userRepository.create({
      email,
      password: hashedPassword,
    });
  }

  async findAll() {
    return this.userRepository.findAll({
      attributes: { exclude: ["password"] },
    });
  }

  async getUserByEmail(email: string) {
    return this.userRepository.findOne({
      where: {
        email,
      },
    });
  }
}
