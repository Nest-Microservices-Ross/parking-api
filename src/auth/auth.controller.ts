
import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto, RegisterUserDto,  UpdateUserDto } from './dto/';

import { Roles, Token } from './decorators';
import { AuthGuard, RolesGuard } from 'src/common/guards';
 
/**
 * Authentication controller for managing user registration, login, verification, and updates.
 * This controller provides endpoints for user authentication and authorization.
 */

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) {}

  /**
   * Authenticates a user and returns an access token.
   *
   * @param {LoginUserDto} loginUserDto - The user's login credentials.
   * @returns {Promise<{ accessToken: string }>} A promise that resolves to an object containing the access token.
   *
   * @example
   * POST /auth/login
   * Body: { "email": "user@example.com", "password": "password123" }
   * Response: { "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." }
   */
  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto): Promise<{ accessToken: string; }>{
    return this.authService.loginUser(loginUserDto)
  }
  
    /**
   * Registers a new user in the system.
   * 
   * @param {RegisterUserDto} registerUserDto - The user's registration details.
   * @returns {Promise<{ message: string }>} A promise that resolves to a success message.
   * 
   * @example
   * POST /auth/register
   * Body: { "email": "user@example.com", "password": "password123", "name": "John Doe" }
   * Response: { "message": "User registered successfully" }
   */
  @Post('register')
  registerUser(@Body() registerUserDto: RegisterUserDto): Promise<{ message: string; }>{
    return this.authService.registerUser(registerUserDto)
  }

 /**
   * Verifies the authenticity of a user's access token.
   * This endpoint is protected by the AuthGuard, ensuring only authenticated users can access it.
   * 
   * @param {string} token - The user's access token (automatically extracted by the Token decorator).
   * @returns {Promise<{ user: object, token: string }>} A promise that resolves to an object indicating whether the token is valid.
   * 
   * @example
   * GET /auth/verify
   * Headers: { "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." }
   * Response: { { "user": { "id": 4, "name": "Rosniel", "email": "ros868@zimbra.com", "role": "cliente",...},
	  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }}
   */
  @Get('verify')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'empleado', 'cliente')
  verifyUser(@Token() token: string){
    return this.authService.verifyToken(token)
  }

  /**
   * Updates a user's details.
   * This endpoint is protected by both the AuthGuard and RolesGuard, ensuring only authenticated users with the 'admin' role can access it.
   * 
   * @param {UpdateUserDto} updateUserDto - The updated user details.
   * @returns {Promise<{ object }>} A promise that resolves to a success message.
   * 
   * @example
   * PUT /auth/me
   * Headers: { "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." }
   * Body: { "email": "newuser@example.com", "name": "Jane Doe" }
   * Response: { { "user": { "id": 4, "name": "Rosniel", "email": "ros868@zimbra.com", "role": "cliente",...},
   */
  @Put('me')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  async updateUser(@Body() updateUserDto: UpdateUserDto){
    console.log(updateUserDto)
    return await this.authService.updateUser(updateUserDto)
  }

}
