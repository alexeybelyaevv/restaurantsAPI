import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class LoginDto {
  @ApiProperty({ example: "user@example.com" })
  @IsEmail({}, { message: "Invalid email format" })
  readonly email: string;

  @ApiProperty({ example: "securePassword123" })
  @IsString({ message: "Password must be a string" })
  readonly password: string;
}
