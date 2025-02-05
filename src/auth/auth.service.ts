import { HttpException, HttpStatus, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { LoginUserDto, RegisterUserDto, UpdateUserDto } from './dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { envs } from 'src/config';
import { Role } from '../common/enum/role.enum';

/**
 * Authentication service for managing user registration, login, token verification, and user updates.
 * This service handles the business logic related to user authentication and authorization.
 */

@Injectable()
export class AuthService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('AuthService');

  constructor(
    private readonly jwtService: JwtService
  ) {
    super();
  }

   /**
   * Connects to the database when the module is initialized.
   */
  onModuleInit() {
    this.$connect();
    this.logger.log('Auth on');
  }

    /**
   * Generates a JWT token for the given payload.
   * 
   * @param {JwtPayload} payload - The payload to be signed into the token.
   * @returns {string} The generated JWT token.
   */
  async signJWT(payload: JwtPayload) {
    return this.jwtService.sign(payload);
  }

    /**
   * Updates a user's details.
   *
   * @param {UpdateUserDto} updateUserDto - The updated user details.
   * @returns {Promise<Object>} A promise that resolves to the updated user object.
   * @throws {HttpException} If the user is not found or no changes are provided.
   *
   * @example
   * const updateUserDto = { id: 1, name: 'Jane Doe', email: 'jane@example.com' };
   * const updatedUser = await authService.updateUser(updateUserDto);
   */
    async updateUser(updateUserDto: UpdateUserDto) {
      const { id, email, name, phone, role } = updateUserDto;
    
      try {
        const user = await this.user.findUnique({
          where: { id }
        });
    
        if (!user) {
          throw new HttpException({ // Usar throw aquí
            message: 'User not found',
          }, HttpStatus.BAD_REQUEST);
        }
    
        const updateData: { name?: string, email?: string, phone?: string, role?: Role } = {};
    
        if (name !== undefined) { updateData.name = name; }
        if (email !== undefined) { updateData.email = email; }
        if (phone !== undefined) { updateData.phone = phone; }
        if (role !== undefined) { updateData.role = role; }
    
        // Revisar si hay cambios
        if (Object.keys(updateData).length === 0) {
          throw new HttpException({ // Usar throw aquí
            message: 'No changes',
          }, HttpStatus.BAD_REQUEST);
        }
    
        const updatedUser = await this.user.update({
          where: { id },
          data: updateData
        });
    
        return updatedUser;
    
      } catch (error) {
        throw new HttpException({
          message: error.message,
        }, HttpStatus.BAD_REQUEST);
      }
    }

    /**
   * Verifies the authenticity of a JWT token.
   *
   * @param {string} token - The JWT token to verify.
   * @returns {Promise<{ user: Object, token: string }>} A promise that resolves to an object containing the user data and a new token.
   * @throws {HttpException} If the token is invalid.
   *
   * @example
   * const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   * const result = await authService.verifyToken(token);
   */
  async verifyToken(token: string): Promise<{ user: object; token: string; }>{
    try {
      const {sub, iat, exp, ...user} = await this.jwtService.verify(token, {
        secret: envs.secret
      });

      return {
        user: user,
        token: await this.signJWT(user)
      }

    } catch (error) {
      console.log(error)
      throw new HttpException({
        message: 'Invalid token',
      },
      HttpStatus.UNAUTHORIZED
    )
    }
  }

    /**
   * Registers a new user in the system.
   *
   * @param {RegisterUserDto} registerUserDto - The user's registration details.
   * @returns {Promise<{ message: string }>} A promise that resolves to a success message.
   * @throws {HttpException} If the user already exists.
   *
   * @example
   * const registerUserDto = { email: 'user@example.com', password: 'password123', name: 'John Doe' };
   * const result = await authService.registerUser(registerUserDto);
   */
  async registerUser(registerUserDto: RegisterUserDto): Promise<{ message: string; }>{

    const {email, name, password} = registerUserDto;
    try {
      const user = await this.user.findUnique({
        where: { email }
      })

      if (user) {
        throw new HttpException({
          message: 'User already exists',
        },
        HttpStatus.BAD_REQUEST
      )
      }

      const newUser = await this.user.create({
        data: {
          email: email,
          password: bcrypt.hashSync(password, 10),
          name: name,
        }
      })

      const { password: __, ...rest} = newUser; // evito enviar la contraseña en el return

      return { "message": "User registered successfully" }
  
    } catch (error) {
      throw new HttpException({
        message: error.message,
      },
      HttpStatus.BAD_REQUEST
    )
    }
  }

    /**
   * Authenticates a user and returns an access token.
   *
   * @param {LoginUserDto} loginUserDto - The user's login credentials.
   * @returns {Promise<{ accessToken: string }>} A promise that resolves to an object containing the access token.
   * @throws {HttpException} If the credentials are invalid.
   *
   * @example
   * const loginUserDto = { email: 'user@example.com', password: 'password123' };
   * const result = await authService.loginUser(loginUserDto);
   */
  async loginUser(loginUserDto: LoginUserDto): Promise<{ accessToken: string; }>{

    const {email, password} = loginUserDto;
    try {
      const user = await this.user.findUnique({
        where: { email }
      })

      if (!user) {
        throw new HttpException({
          message: 'Invalid credentials',
        },
        HttpStatus.BAD_REQUEST
      )
      }

      const isPasswordValid = bcrypt.compareSync(password, user.password)

      if (!isPasswordValid) {
        throw new HttpException({
          message: 'Invalid credentials',
        },
        HttpStatus.UNAUTHORIZED
      )}

      const { password: __, ...rest} = user; // evito enviar la contraseña en el return

      const token = await this.signJWT(rest)

      return  {"accessToken": token}

    } catch (error) {
      throw new HttpException({
        message: error.message,
      },
      HttpStatus.BAD_REQUEST
    )
    }
  }

}
