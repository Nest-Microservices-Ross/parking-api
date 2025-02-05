import { Module } from '@nestjs/common';
import { ParkingService } from './parking.service';
import { ParkingController } from './parking.controller';
import { LogsPrismaModule } from 'src/common/services/logs/logs-prisma.controller';
/**
 * @class ParkingModule
 * @description Module that exposes the ParkingController.
 * @module ParkingModule
 * @requires LogsPrismaModule
 */
@Module({
  controllers: [ParkingController],
  providers: [ParkingService],
  imports: [LogsPrismaModule]

})
export class ParkingModule {}
