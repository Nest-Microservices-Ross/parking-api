import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { envs } from 'src/config';

/**
 * @class AuthModule
 * @description Module that exposes the AuthController.
 * @module AuthModule
 * @requires JwtModule
 */
@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    JwtModule.register({
      global: true,
      secret: envs.secret,
      signOptions: { expiresIn: '2h' },
    }),
  ]
})
export class AuthModule {}