import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UserResponseDto } from "./dto/user-response.dto";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@ApiTags("Users")
@UseGuards(JwtAuthGuard)
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({
    summary: "Get all users",
  })
  @ApiResponse({
    status: 200,
    type: [UserResponseDto],
  })
  @Get()
  getAllUsers() {
    return this.usersService.findAll();
  }

  @ApiOperation({
    summary: "Creation of the user",
  })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: 200,
    type: UserResponseDto,
  })
  @Post()
  createUser(@Body() user: CreateUserDto) {
    return this.usersService.createUser(user);
  }
}
