import {
  Body,
  Controller,
  Get,
  Header,
  HttpCode,
  Param,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { UsersService } from "src/users/users.service";
import { JwtAuthGuard } from "./jwt-auth.guard";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService
  ) {}

  @HttpCode(200)
  @ApiOperation({
    summary: "Login by email and password",
  })
  @ApiResponse({
    status: 200,
    schema: {
      example: {
        accessToken: "your.jwt.token",
      },
    },
  })
  @Post("login")
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Get("me")
  @UseGuards(JwtAuthGuard)
  me(@Req() req: any) {
    return this.usersService.getUserById(req.user.id);
  }
}
