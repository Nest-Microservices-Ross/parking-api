import { Controller, Get, Post, Body, UseGuards, Query, ValidationPipe, Put, Delete } from '@nestjs/common';
import { Roles } from 'src/auth/decorators';
import { ReservationsService } from './reservations.service';
import { CancellReserveDto } from './dto/cancelled-reserve.dto';
import { AuthGuard, RolesGuard } from 'src/common/guards';
import { ReserveSpotDto } from './dto/reserve-spot.dto';
import { UpdateReservationDto } from './dto/update-reserve.dto';
import { DeleteReservationDto } from './dto/delete-reserve.dto';

/**
 * @class ReservationsController
 * @description Controller that exposes endpoints for managing reservations. Each endpoint is protected by authentication and authorization guards based on the user's role.
 */
@Controller('reservations')
export class ReservationsController {
  /**
   * @constructor
   * @param {ReservationsService} reservationsService Service containing the business logic for reservations.
  */
  constructor(private readonly reservationsService: ReservationsService) {}

    /**
   * @method checkAvailability
   * @description Endpoint to check the availability of parking spots.
   *
   * @returns {Promise<any[]>} List of available parking spots.
   *
   * @example GET /reservations/availability
   *
   * @guards AuthGuard, RolesGuard
   * @roles employee, admin
   */
  @Get('availability')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('empleado', 'admin')
  checkAvailability(): Promise<any[]> {
    return this.reservationsService.checkAvailability();
  }


    /**
   * @method reserveSpot
   * @description Endpoint to create a new reservation.
   *
   * @param {ReserveSpotDto} reserveSpotDto Object received in the request body with reservation data.
   * @returns {Promise<any>} The created reservation.
   *
   * @example POST /reservations/reserve
   *
   * @guards AuthGuard, RolesGuard
   * @roles client, admin, employee
   */
  @Post('reserve')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('cliente', 'admin', 'empleado')
  reserveSpot(@Body() reserveSpotDto: ReserveSpotDto): Promise<any> {
    return this.reservationsService.reserveSpot(reserveSpotDto);
  }

   /**
   * @method cancelReservation
   * @description Endpoint to cancel (mark as deleted) an existing reservation.
   *
   * @param {CancellReserveDto} cancellReserveDto Object received in the request body that contains the reservation ID.
   * @returns {Promise<any>} Confirmation message.
   *
   * @example POST /reservations/cancel-reserve
   *
   * @guards AuthGuard, RolesGuard
   * @roles employee, admin
   */
  @Post('cancel-reserve')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('empleado', 'admin')
  cancelReservation(@Body() cancellReserveDto: CancellReserveDto): Promise<any> {
      return this.reservationsService.cancelReservation(cancellReserveDto);
    }

    /**
   * @method updateReservation
   * @description Endpoint to update an existing reservation's data.
   *
   * @param {UpdateReservationDto} updateReservationDto Object received in the request body with the data to update.
   * @returns {Promise<any>} The updated reservation.
   *
   * @example PUT /reservations/update-reserve
   *
   * @guards AuthGuard, RolesGuard
   * @roles employee, admin
   */
  @Put('update-reserve')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('empleado', 'admin')
  updateReservation(@Body() updateReservationDto: UpdateReservationDto): Promise<any> {
      return this.reservationsService.updateReservation(updateReservationDto);
    }

    /**
   * @method deleteReservation
   * @description Endpoint to physically delete a reservation from the database.
   *
   * @param {DeleteReservationDto} deleteReservationDto Object received in the request body that contains the reservation ID to delete.
   * @returns {Promise<any>} Confirmation message.
   *
   * @example DELETE /reservations/delete-reserve
   *
   * @guards AuthGuard, RolesGuard
   * @roles employee, admin
   */
  @Delete('delete-reserve')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('empleado', 'admin')
  deleteReservation(@Body() deleteReservationDto: DeleteReservationDto) {
      return this.reservationsService.deleteReservation(deleteReservationDto);
    }

}
