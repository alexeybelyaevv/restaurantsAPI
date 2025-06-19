import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserDto } from "./dto/create-user.dto";
import * as bcrypt from "bcryptjs";
import { ROLE_VALUES } from "src/common/enums";

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async onModuleInit() {
    const email = process.env.ADMIN_EMAIL;
    if (!email) {
      console.log("No Admin Info In ENV");
      return;
    }
    const existingUser = await this.getUserByEmail(email);

    if (existingUser) {
      console.log(
        `User with email ${email} already exists (id=${existingUser.id})`
      );
    } else {
      const newUser = await this.createUser({
        email: email,
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
    return await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role,
      },
    });
  }

  async findAll() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        role: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async getUserByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }
}
