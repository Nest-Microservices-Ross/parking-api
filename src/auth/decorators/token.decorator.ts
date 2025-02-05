/*
  Decorator to get the token from the request header.
  It is used to authenticate the user and check if the token is valid.
*/

import { createParamDecorator, ExecutionContext, InternalServerErrorException } from '@nestjs/common';

export const Token = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {

    const request = ctx.switchToHttp().getRequest();

    if (!request.token) {
      throw new InternalServerErrorException('User not found in request (AuthGuard called?)');
    }

    return request.token;
  },
);