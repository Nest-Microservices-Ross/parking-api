import { Module } from '@nestjs/common';
import { LogsService } from './logs.service';

import { LogsController } from './logs.controller';
import { LogsPrismaModule } from 'src/common/services/logs/logs-prisma.controller';

/**
 * @class LogsModule
 * @description Module that exposes the LogsController.
 * @module LogsModule
 * @requires LogsPrismaModule
 */
@Module({
  controllers: [LogsController],
  providers: [LogsService],
  imports: [LogsPrismaModule]
})
export class LogsModule {}
