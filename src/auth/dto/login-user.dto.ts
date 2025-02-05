
import { IsEmail, IsString, IsStrongPassword } from "class-validator";

/**
 * @class LoginUserDto
 * @description DTO to login a user.
 */
export class LoginUserDto {

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @IsStrongPassword()
  password: string;

}