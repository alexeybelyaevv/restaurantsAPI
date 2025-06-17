import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "src/users/users.service";

@Injectable()
export class IsAdminGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    const authHeader = req.headers?.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new UnauthorizedException("No token provided");
    }

    const token = authHeader.split(" ")[1];

    try {
      const payload = this.jwtService.verify(token);
      const email = payload?.email;
      if (!email) {
        throw new UnauthorizedException("Invalid token payload");
      }

      const user = await this.usersService.getUserByEmail(email);
      if (!user || user.role === "user") {
        throw new UnauthorizedException("Access denied");
      }

      return true;
    } catch (err) {
      console.log("JWT or user fetch failed:", err);
      throw new UnauthorizedException("User is not authenticated");
    }
  }
}
