import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ParkingModule } from './parking/parking.module';
import { ReservationsModule } from './reservations/reservations.module';
import { LogsModule } from './logs/logs.module';

/**
 * @class AppModule
 * @description Module that imports all the modules of the application.
 * @module AppModule
 * @requires AuthModule
 * @requires ParkingModule
 * @requires ReservationsModule
 * @requires LogsModule
 */
@Module({
  imports: [AuthModule, ParkingModule, ReservationsModule, LogsModule],
})
export class AppModule {}
