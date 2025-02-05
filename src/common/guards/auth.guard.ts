import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { envs } from 'src/config';

/**
 * @class AuthGuard
 * @description Guard to authenticate the user and check if the token is valid.
 * It is used to protect the routes that require authentication.
 * @implements {CanActivate}
 */

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

    /**
   * @method canActivate
   * @description Checks if the token is valid and extracts the user from the payload.
   * @param {ExecutionContext} context The execution context.
   * @returns {Promise<boolean>} A promise that resolves to a boolean indicating whether the token is valid.
   * @throws {UnauthorizedException} If the token is not valid.
   */

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException('Token no proporcionado');
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: envs.secret,
      });

      request['user'] = payload;
      request['token'] = token;
    } catch (error) {

      throw new UnauthorizedException('Token inválido');
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}