import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { User } from "./user.model";
import { InjectModel } from "@nestjs/sequelize";
import { CreateUserDto } from "./dto/create-user.dto";
import * as bcrypt from "bcryptjs";
import { ROLE_VALUES } from "src/common/enums";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  async onModuleInit() {
    const email = process.env.ADMIN_EMAIL;
    const existingUser = await this.userRepository.findOne({
      where: { email },
    });

    if (existingUser) {
      console.log(
        `User with email ${email} already exists (id=${existingUser.id})`
      );
    } else {
      const newUser = await this.createUser({
        email: "admin@gmail.com",
        password: String(process.env.ADMIN_PASSWORD),
        role: ROLE_VALUES.superadmin,
      });

      console.log(`Created default admin user (id=${newUser.id})`);
    }
  }

  async createUser({ password, email, role }: CreateUserDto) {
    const user = await this.getUserByEmail(email);

    if (user) {
      throw new HttpException("User already exists!", HttpStatus.CONFLICT);
    }

    const hashedPassword = await bcrypt.hash(password, 5);
    return await this.userRepository.create({
      email,
      password: hashedPassword,
      role,
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
