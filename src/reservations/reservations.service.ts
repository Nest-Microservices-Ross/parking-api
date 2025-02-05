import { HttpException, HttpStatus, Injectable,  Logger,  OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { LogsPrismaService } from 'src/common/services/logs/logs-prisma-services';
import { ReserveSpotDto } from './dto/reserve-spot.dto';
import { EventType } from 'src/common/enum';
import { CancellReserveDto } from './dto/cancelled-reserve.dto';
import { UpdateReservationDto } from './dto/update-reserve.dto';
import { DeleteReservationDto } from './dto/delete-reserve.dto';

/**
 * @class ReservationsService
 * @description Service responsible for managing reservations. It handles operations such as creating, updating, canceling, and deleting reservations,
 * as well as checking availability. It uses PrismaClient to interact with the database and LogsPrismaService to log important events.
 *
 * @implements {OnModuleInit}
 */

@Injectable()
export class ReservationsService extends PrismaClient implements OnModuleInit {
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
   */
    onModuleInit() {
      this.$connect();
      this.logger.log('Reservations on');
    }


    /**
   * @method cancelReservation
   * @description Cancels an existing reservation by marking it as deleted.
   *
   * @param {CancellReserveDto} deleteReservationDto DTO containing the reservation ID to cancel.
   * @returns {Promise<{ message: string }>} Success message.
   *
   * @throws {HttpException} If the reservation is not found, already deleted, or an error occurs during the process.
   */
    async cancelReservation(deleteReservationDto: CancellReserveDto): Promise<{ message: string; }>{
      try {
        const existingReservation = await this.reservation.findUnique({
          where: { id: deleteReservationDto.referenceId },
        });

        if (!existingReservation) {
          throw new HttpException(
            { message: 'Reserva no encontrada' },
            HttpStatus.NOT_FOUND,
          );
        }

        if (existingReservation.deleted) {
          throw new HttpException(
            { message: 'La reserva ya está eliminada' },
            HttpStatus.BAD_REQUEST,
          );
        }

        const deletedReservation = await this.reservation.update({
          where: { id: deleteReservationDto.referenceId },
          data: { deleted: true }
        })

        await this.logsService.logEvent(
              EventType.reservationDeleted,
              `Deleted reservation ID ${deleteReservationDto.referenceId}`,
              null,
              deletedReservation.clientId.toString(),
              { reservationStart: deletedReservation.reservationStart, reservationEnd: deletedReservation.reservationEnd }
            );
        return {message: `Reservation ID ${deleteReservationDto.referenceId} cancelled successfully`}

      } catch (error) {
        throw new HttpException(
          { message: error.message },
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    /**
   * @method updateReservation
   * @description Updates the data of an existing reservation.
   *
   * @param {UpdateReservationDto} updateReservationDto DTO containing the fields to update and the reservation ID.
   * @returns {Promise<any>} The updated reservation.
   *
   * @throws {HttpException} If the reservation is not found, already deleted, the dates are invalid, or another error occurs.
   */
    async updateReservation(updateReservationDto: UpdateReservationDto): Promise<any>{
      try {
        const existingReservation = await this.reservation.findUnique({
          where: { id: updateReservationDto.referenceId },
        });

        if (!existingReservation) {
          throw new HttpException(
            { message: 'Reserva no encontrada' },
            HttpStatus.NOT_FOUND,
          );
        }

        if (existingReservation.deleted) {
          throw new HttpException(
            { message: 'La reserva ya está eliminada' },
            HttpStatus.BAD_REQUEST,
          );
        }

        if (updateReservationDto.reservationStart !== undefined && updateReservationDto.reservationEnd !== undefined){
          if (new Date(updateReservationDto.reservationStart) >= new Date(updateReservationDto.reservationEnd)) {
            throw new HttpException(
              { message: 'La fecha de inicio debe ser anterior a la fecha de fin' },
              HttpStatus.BAD_REQUEST,
            );
          }
        }

        const updateData: {clientId?: number, parkingSpotId?: number, reservedById?: number, carType?: string, reservationStart?: string, reservationEnd?: string} = {};
        if (updateReservationDto.clientId !== undefined){ updateData.clientId = updateReservationDto.clientId}
        if (updateReservationDto.parkingSpotId !== undefined){ updateData.parkingSpotId = updateReservationDto.parkingSpotId}
        if (updateReservationDto.reservedById !== undefined){ updateData.reservedById = updateReservationDto.reservedById}
        if (updateReservationDto.carType !== undefined){ updateData.carType = updateReservationDto.carType}
        if (updateReservationDto.reservationStart !== undefined){ updateData.reservationStart = updateReservationDto.reservationStart}
        if (updateReservationDto.reservationEnd !== undefined){ updateData.reservationEnd = updateReservationDto.reservationEnd}

      

        const updatedReservation = await this.reservation.update({
          where: { id: updateReservationDto.referenceId },
          data: updateData
        })

        await this.logsService.logEvent(
              EventType.reservationUpdated,
              `Updated reservation ID ${updateReservationDto.referenceId}`,
              null,
              updatedReservation.clientId.toString(),
              { reservationStart: updateReservationDto.reservationStart, reservationEnd: updateReservationDto.reservationEnd }
            );
        return updatedReservation

      } catch (error) {
        throw new HttpException(
          { message: error.message },
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    /**
   * @method checkAvailability
   * @description Checks for parking spots that are currently available (i.e., without active reservations at the current time).
   *
   * @returns {Promise<any[]>} List of available parking spots.
   *
   * @throws {HttpException} In case of an error during the operation.
   */
    async checkAvailability(): Promise<any[]>{
        try {
          const now = new Date();
          const currentlyAvailableSpots = await this.parkingSpot.findMany({
            where: {
              reservations: {
                none: {
                  reservationStart: { lte: now },
                  reservationEnd: { gte: now },
                },
              },
            },
          });

          await this.logsService.logEvent(
            EventType.availabilityChecked,
            `Checked availability from ${now} to ${now}`,
            null,
            null,
            {}
          );

          return currentlyAvailableSpots
        } catch (error) {
          throw new HttpException({
            message: error.message,
          },
          HttpStatus.BAD_REQUEST
        );
        }
      }

    /**
   * @method reserveSpot
   * @description Reserves a parking spot for a specified period. It validates the existence of the spot, the coherence of the dates,
   * and the absence of overlapping reservations.
   *
   * @param {ReserveSpotDto} reserveSpotDto DTO containing the reservation information.
   * @returns {Promise<any>} The newly created reservation.
   *
   * @throws {HttpException} If the parking spot is not found, the dates are invalid, the spot is already reserved during the period, or another error occurs.
   */
  async reserveSpot(reserveSpotDto: ReserveSpotDto): Promise<any> {

    /*
      Function to reserve a parking spot for a given period.
      It checks if the spot is available and if there is no overlapping reservation.
      If there is no overlapping reservation, it creates a new reservation.
    */
    try {
      const {
        spotNumber,
        reservationStart,
        reservationEnd,
        clientId,
        carType,
        reservedById,
      } = reserveSpotDto;

      const spot = await this.parkingSpot.findUnique({
        where: { spotNumber },
        include: { reservations: true },
      });

      if (!spot) {
        throw new HttpException(
          { message: 'Plaza no encontrada' },
          HttpStatus.NOT_FOUND,
        );
      }

      const newStart = new Date(reservationStart);
      const newEnd = new Date(reservationEnd);

      if (newStart >= newEnd) {
        throw new HttpException(
          { message: 'La fecha de inicio debe ser anterior a la fecha de fin' },
          HttpStatus.BAD_REQUEST,
        );
      }

      const overlappingReservation = spot.reservations.find((reservation) => {
        const existingStart = new Date(reservation.reservationStart);
        const existingEnd = new Date(reservation.reservationEnd);

        return newStart < existingEnd && newEnd > existingStart;
      });

      if (overlappingReservation) {
        throw new HttpException(
          { message: 'La plaza ya está reservada en el periodo solicitado' },
          HttpStatus.FORBIDDEN,
        );
      }

      const newReservation = await this.reservation.create({
        data: {
          reservationStart: newStart,
          reservationEnd: newEnd,
          carType,
          client: {
            connect: { id: clientId }
          },
          reservedBy: reservedById
            ? { connect: { id: reservedById } }
            : undefined,
          parkingSpot: {
            connect: { id: spot.id },
          },
        }
      });

      const now = new Date();
      if (newStart <= now && now <= newEnd) {
        await this.parkingSpot.update({
          where: { id: spot.id },
          data: { isOccupied: true },
        });
      }

      await this.logsService.logEvent(
              EventType.reservationCreated,
              `Reservation created for spot ${spotNumber} from ${reservationStart} to ${reservationEnd}`,
              clientId,
              newReservation.id.toString(),
              { spotNumber, reservationStart, reservationEnd, clientId, carType }
            );

      return newReservation;
    } catch (error) {
      throw new HttpException(
        { message: error.message },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  /**
   * @method deleteReservation
   * @description Physically deletes a reservation from the database.
   *
   * @param {DeleteReservationDto} cancellReserveDto DTO containing the reservation ID to delete.
   * @returns {Promise<{ message: string }>} Message indicating that the reservation was successfully deleted.
   *
   * @throws {HttpException} If the reservation is not found or an error occurs during deletion.
   */
  async deleteReservation(cancellReserveDto: DeleteReservationDto) {

      try {
        const existingReservation = await this.reservation.findUnique({
          where: { id: cancellReserveDto.referenceId },
        });

        if (!existingReservation) {
          throw new HttpException(
            { message: 'Reserva no encontrada' },
            HttpStatus.NOT_FOUND,
          );
        }
  
        const canceledReservation = await this.reservation.delete({
          where: { id: cancellReserveDto.referenceId },
        });
        await this.logsService.logEvent(
          EventType.reservationCancelled,
          `Reservation deleted for reservation ID ${canceledReservation.id}`,
          canceledReservation.clientId,
          null,
          {}
        );
        return {message: `Reservation ID ${cancellReserveDto.referenceId} deleted successfully`}
      } catch (error) {
        throw new HttpException(
          { message: error.message },
          HttpStatus.BAD_REQUEST,
        );
      }
    }
}
