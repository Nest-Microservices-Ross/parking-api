import { IsEmail, IsString, IsStrongPassword } from "class-validator";

/**
 * @class RegisterUserDto
 * @description DTO to register a user.
 */
export class RegisterUserDto {

  @IsString()
 
  name: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @IsStrongPassword()
  password: string;

}