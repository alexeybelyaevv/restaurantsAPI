import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsIn, IsString, MinLength } from "class-validator";
import { Role } from "@prisma/client";

export class CreateUserDto {
  @ApiProperty({ example: "user@example.com" })
  @IsEmail({}, { message: "Invalid email format" })
  readonly email: string;

  @ApiProperty({ example: "securePassword123" })
  @IsString({ message: "Password must be a string" })
  @MinLength(6, { message: "Password must be at least 6 characters" })
  readonly password: string;

  @ApiProperty({ example: "user", enum: Role })
  @IsString({ message: "Role must be a string" })
  @IsIn(Object.values(Role), {
    message: "Role must be one of: user, admin, superadmin",
  })
  readonly role: Role;
}
