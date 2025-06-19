import { Body, Controller, Get, Header, HttpCode, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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

  // @Get("me")
  // me(@Header headers) {
  //   return;
  // }
}
