// src/logs/logs-prisma.service.ts
import { Injectable, OnModuleInit, OnModuleDestroy, HttpException, Logger, HttpStatus } from '@nestjs/common';
import { PrismaClient } from '../../../../prisma/mongodb/mongodb/client'; // Cliente generado para MongoDB
import { EventType } from '../../enum';

/** 
 * @class LogsPrismaService
 * @description Service responsible for logging events. It handles operations such as reading logs, logging vehicle entries and exits, and checking availability.
 * It uses PrismaClient to interact with the database and LogsPrismaService to log important events.
 * @implements {OnModuleInit}
 * @requires LogsPrismaService
 */
@Injectable()
export class LogsPrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {

  private readonly logger = new Logger('LogsPrismaService');



  async onModuleInit() {
    await this.$connect();
    this.logger.log('MongoDB Connected');
  }
  
  async onModuleDestroy() {
    await this.$disconnect();
  }

  async logEvent(eventType: EventType, description: string, userId?: number, referenceId?: string, metadata?: any) {
    try {
      await this.log.create({
        data: {
          eventType,
          description,
          userId,
          referenceId,
          metadata,
        },
      });
    } catch (error) {
      this.logger.error(`Failed to log event: ${error.message}`);
    }
  } catch (error) {
    return new HttpException({
      message: error.message,
    },
    HttpStatus.BAD_REQUEST
  )
}

}
