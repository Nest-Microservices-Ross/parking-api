import { HttpException, HttpStatus, Injectable, Logger, type OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import {  CreateSpotDto } from './dto/';
import { LogsPrismaService } from 'src/common/services/logs/logs-prisma-services';
import { EventType } from 'src/common/enum';
import { UpdateSpotDto } from './dto/update-spot.dto';
import { DeleteSpotDto } from './dto/delete-spot.dto';


/**
 * @class ParkingService
 * @description Service responsible for managing parking spots. It handles operations such as creating, updating, deleting, and checking availability.
 * It uses PrismaClient to interact with the database and LogsPrismaService to log important events.
 *
 * @implements {OnModuleInit} 
 * @requires LogsPrismaService
 */

@Injectable()
export class ParkingService extends PrismaClient implements OnModuleInit{

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
   * @method deleteSpot
   * @description Deletes a parking spot from the database.
   * @param {DeleteSpotDto} deleteSpotDto DTO containing the parking spot ID to delete.
   * @returns {Promise<{ message: string }>} Success message.
   * @throws {HttpException} If the parking spot is not found, already deleted, or an error occurs during the process.  
   * @requires parkingSpot.delete
   * @example
   * const deleteSpotDto = { spotNumber: '123' };
   * const result = await parkingService.deleteSpot(deleteSpotDto);
   */
  async deleteSpot(deleteSpotDto: DeleteSpotDto): Promise<{ message: string; }>{
    try {
      const existingSpot = await this.parkingSpot.findUnique({
        where: { spotNumber: deleteSpotDto.spotNumber },
      });

      if (!existingSpot) {
        throw new HttpException(
          { message: 'Plaza no encontrada' },
          HttpStatus.NOT_FOUND,
        );
      }

      if (existingSpot.deleted) {
        throw new HttpException(
          { message: 'La plaza ya está eliminada' },
          HttpStatus.BAD_REQUEST,
        );
      }

      const deletedSpot = await this.parkingSpot.update({
        where: { spotNumber: deleteSpotDto.spotNumber },
        data: { deleted: true }
      })

      await this.logsService.logEvent(
              EventType.parkingSpotDeleted,
              `Deleted parking spot with number ${deleteSpotDto.spotNumber}`,
              null,
              deletedSpot.id.toString(),
              { spotNumber: deleteSpotDto.spotNumber }
            );

      return {message: `Parking spot ${deleteSpotDto.spotNumber} deleted successfully`}

    } catch (error) {
      throw new HttpException({
        message: error.message,
      },
      HttpStatus.BAD_REQUEST
    )
    }
  }

    /**
   * @method getSpots
   * @description Retrieves a list of all parking spots from the database.
   * @returns {Promise<any[]>} List of parking spots.
   * @throws {HttpException} If an error occurs during the operation.
   * @requires parkingSpot.findMany
   * @example
   * const spots = await parkingService.getSpots();
   */

  async getSpots(): Promise<any[]>{
    try {
      const spots = await this.parkingSpot.findMany();

      await this.logsService.logEvent(
              EventType.parkingSpotConsulted,
              `Consulted parking spots`,
              null,
              null,
              {}
            );
      return spots
    } catch (error) {
      throw new HttpException({
        message: error.message,
      },
      HttpStatus.BAD_REQUEST
    )
    }
  }

    /**
   * @method updateSpot
   * @description Updates the data of an existing parking spot.
   * @param {UpdateSpotDto} updateSpotDto DTO containing the fields to update and the parking spot ID.
   * @returns {Promise<any>} The updated parking spot.
   * @throws {HttpException} If the parking spot is not found, already deleted, the dates are invalid, or another error occurs.
   * @requires parkingSpot.update
   * @example
   * const updateSpotDto = { spotNumber: '123', carType: 'SUV', reservedById: 1, deleted: false };
   * const updatedSpot = await parkingService.updateSpot(updateSpotDto);
   */

  async updateSpot(updateSpotDto: UpdateSpotDto): Promise<any>{
    try {
      const existingSpot = await this.parkingSpot.findUnique({
        where: { spotNumber: updateSpotDto.spotNumber },
      });
      if (!existingSpot) {
        throw new HttpException(
          { message: 'Plaza no encontrada' },
          HttpStatus.NOT_FOUND,
        );
      }

      const updateData: {spotNumber?: string, carType?: string, reservedById?: number} = {};
      if (updateSpotDto.spotNumber !== undefined){ updateData.spotNumber = updateSpotDto.spotNumber}
      if (updateSpotDto.carType !== undefined){ updateData.carType = updateSpotDto.carType}
      if (updateSpotDto.reservedById !== undefined){ updateData.reservedById = updateSpotDto.reservedById}
      await this.parkingSpot.update({
        where: { spotNumber: updateSpotDto.spotNumber },
        data: updateData
      })

      await this.logsService.logEvent(
              EventType.parkingSpotUpdated,
              `Updated parking spot with number ${updateSpotDto.spotNumber}`,
              null,
              existingSpot.id.toString(),
              { spotNumber: updateSpotDto.spotNumber }
            );
      return existingSpot
    } catch (error) {
      throw new HttpException({
        message: error.message,
      },
      HttpStatus.BAD_REQUEST
    )
    }
  }

    /**
   * @method createSpot
   * @description Creates a new parking spot in the database.
   * @param {CreateSpotDto} createSpotDto DTO containing the parking spot data.
   * @returns {Promise<any>} The newly created parking spot.
   * @throws {HttpException} If the parking spot already exists or an error occurs during the operation.
   * @requires parkingSpot.create
   * @example
   * const createSpotDto = { spotNumber: '123', carType: 'SUV', reservedById: 1, deleted: false };
   * const newSpot = await parkingService.createSpot(createSpotDto);
   */

  async createSpot(createSpotDto: CreateSpotDto): Promise<any>{
    try {
      const existingSpot = await this.parkingSpot.findUnique({
        where: { spotNumber: createSpotDto.spotNumber },
      });

      if (existingSpot) {
        throw new HttpException(
          { message: 'La plaza ya existe' },
          HttpStatus.BAD_REQUEST,
        );
      }

      const newSpot = await this.parkingSpot.create({
        data: {
          spotNumber: createSpotDto.spotNumber,
        }
      })

    await this.logsService.logEvent(
              EventType.parkingSpotCreated,
              `Created new parking spot with number ${createSpotDto.spotNumber}`,
              null,
              newSpot.id.toString(),
              { spotNumber: createSpotDto.spotNumber }
            );
      return newSpot;
    } catch (error) {
      throw new HttpException({
        message: error.message,
      },
      HttpStatus.BAD_REQUEST
    )
    }
  }
}
