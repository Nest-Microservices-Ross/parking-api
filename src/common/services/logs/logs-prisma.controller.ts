import { Module } from '@nestjs/common';
import { LogsPrismaService } from './logs-prisma-services';


/** 
 * @class LogsPrismaModule
 * @description Module that exposes the LogsPrismaService.
 * @module LogsPrismaModule
 * @requires LogsPrismaService
 */
@Module({
  providers: [LogsPrismaService],
  exports: [LogsPrismaService], 
})
export class LogsPrismaModule {}
