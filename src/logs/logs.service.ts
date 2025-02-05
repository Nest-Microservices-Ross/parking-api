import { HttpException, HttpStatus, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Action, EventType } from 'src/common/enum';
import { LogsPrismaService } from 'src/common/services/logs/logs-prisma-services';
import { ReadLogsDto, StatusVehicleDto } from './dto';


/**
 * @class LogsService
 * @description Service responsible for logging events. It handles operations such as reading logs, logging vehicle entries and exits, and checking availability.
 * It uses PrismaClient to interact with the database and LogsPrismaService to log important events.
 * @implements {OnModuleInit}
 * @requires LogsPrismaService
 */

@Injectable()
export class LogsService extends PrismaClient implements OnModuleInit{

  private readonly logger = new Logger('ParkingService');

  /**
   * @constructor
   * @param {LogsPrismaService} logsService Service for logging events.
   */
  constructor(
    private readonly logsService: LogsPrismaService
  ){
    super();
  }

  /**
   * @method onModuleInit
   * @description This method is executed when the module is initialized to establish a connection with the database. 
   * It logs a message to the console.
   * @requires $connect
  */

  onModuleInit() {
    this.$connect();
    this.logger.log('Parking on');
  }

    /**
   * @method logVehicleEntry
   * @description Logs a vehicle entry or exit event in the database.
   * @param {StatusVehicleDto} statusVehicleDto DTO containing the vehicle details and the action to log.
   * @returns {Promise<{ message: string }>} Success message.
   * @throws {HttpException} If the parking spot is not found, already deleted, the dates are invalid, or another error occurs.
   * @requires parkingSpot.update
   * @example
   * const statusVehicleDto = { spotNumber: '123', vehicleDetails: 'SUV', action: 'entrada' };
   * const result = await logsService.logVehicleEntry(statusVehicleDto);
   */
    async logVehicleEntry(statusVehicleDto: StatusVehicleDto): Promise<{ message: string; }> {
      const { spotNumber, vehicleDetails, action } = statusVehicleDto;
      try {
        const spot = await this.parkingSpot.findUnique({
          where: { spotNumber },
        });
    
        if (!spot) {
          throw new HttpException(
            { message: 'Plaza no encontrada' },
            HttpStatus.NOT_FOUND,
          );
        }
  
        if (action === Action.entrada) {
          await this.logsService.logEvent(
            EventType.vehicleEntry,
            `Vehicle entered spot ${spotNumber}`,
            null,
            spot.id.toString(),
            { vehicleDetails }
          );
        }
  
        if (action === Action.salida) {
          await this.logsService.logEvent(
            EventType.vehicleExit,
            `Vehicle exited spot ${spotNumber}`,
            null,
            spot.id.toString(),
            { vehicleDetails }
          );
        }
        return { message:`${action} hecha con éxito` };
      } catch (error) {
        throw new HttpException(
          { message: error.message },
          HttpStatus.BAD_REQUEST,
        );
      }
    }


    /**
   * @method getLogs
   * @description Retrieves a list of logs from the database.
   * @param {ReadLogsDto} readLogsDto DTO containing the user ID, event type, and reference ID to filter the logs.
   * @returns {Promise<any[]>} List of logs.
   * @throws {HttpException} If an error occurs during the operation.
   * @requires logs.findMany
   * @example
   * const readLogsDto = { userId: 1, TypeEvent: 'reservationCreated', referenceId: '123' };
   * const logs = await logsService.getLogs(readLogsDto); 
   */
    async getLogs(readLogsDto: ReadLogsDto): Promise<any[]>{
  
      const { userId, TypeEvent, referenceId } = readLogsDto;
  
      if (!userId && !TypeEvent && !referenceId) {
        const logs = await this.logsService.log.findMany({
          orderBy: {
            timestamp: 'desc',
          },
        });
      }
      const structLogs: {userId?: number, TypeEvent?: EventType, referenceId?: string} = {};
      if (userId !== undefined){ structLogs.userId = userId}
      if (TypeEvent !== undefined){ structLogs.TypeEvent = TypeEvent}
      if (referenceId !== undefined){ structLogs.referenceId = referenceId}
  
      const logs = await this.logsService.log.findMany({
        where: structLogs,
        orderBy: {
          timestamp: 'desc',
        },
      });
      return logs
    }
  
  
}
