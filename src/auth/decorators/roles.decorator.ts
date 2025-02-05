/*
  Decorator to set the roles of a user.
  It is used to check if a user has the required role to access a resource.
*/

import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);