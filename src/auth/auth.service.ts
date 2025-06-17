import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "src/users/user.model";
import { LoginDto } from "./dto/login.dto";
import { UsersService } from "src/users/users.service";
import { JwtService } from "@nestjs/jwt";
import bcrypt from "bcryptjs";
import { NotFoundException, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async login({ email, password }: LoginDto) {
    const user = await this.usersService.getUserByEmail(email);
    if (!user) {
      throw new NotFoundException("No such user");
    }

    const passwordEquals = await bcrypt.compare(password, user.password);
    if (!passwordEquals) {
      throw new UnauthorizedException("Invalid Password!");
    }

    const accessToken = this.generateToken(user);
    return accessToken;
  }

  private generateToken(user: User) {
    const payload = {
      email: user.email,
      id: user.id,
    };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
