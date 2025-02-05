import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { LogsPrismaModule } from 'src/common/services/logs/logs-prisma.controller';


/**
 * @class ReservationsModule
 * @description Module that exposes the ReservationsController.
 * @module ReservationsModule
 * @requires LogsPrismaModule
 */
@Module({
  controllers: [ReservationsController],
  providers: [ReservationsService],
  imports: [LogsPrismaModule]
})
export class ReservationsModule {}
