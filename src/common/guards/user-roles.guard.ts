import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/auth/decorators';

/**
 * @class RolesGuard
 * @description Guard to check if a user has the required role to access a resource.
 * It is used to protect the routes that require specific roles.
 * @implements {CanActivate}
 */


@Injectable()
export class RolesGuard implements CanActivate {
  /**
   * @constructor
   * @param {Reflector} reflector The reflector service.
   */
  constructor(private reflector: Reflector) {}

    /**
   * @method canActivate
   * @description Checks if the user has the required role to access the resource.
   * @param {ExecutionContext} context The execution context.
   * @returns {boolean} A boolean indicating whether the user has the required role.
   */
  canActivate(context: ExecutionContext): boolean {

    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {

      return true;
    }

    const request = context.switchToHttp().getRequest();
    const { user } = request;

    if (!user || !user.role) {
      return false;
    }

    return requiredRoles.includes(user.role);
  }
}
