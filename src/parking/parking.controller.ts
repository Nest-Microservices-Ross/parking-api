import { Body, Controller, Get, Post, Put, Delete, UseGuards } from '@nestjs/common';
import { ParkingService } from './parking.service';
import { Roles } from 'src/auth/decorators';
import { CreateSpotDto } from './dto/create-spot.dto';
import { AuthGuard, RolesGuard } from 'src/common/guards';
import { UpdateSpotDto } from './dto/update-spot.dto';
import { DeleteSpotDto } from './dto/delete-spot.dto';


/**
 * @class ParkingController
 * @description Controller that exposes endpoints for managing parking spots. Each endpoint is protected by authentication and authorization guards based on the user's role.
 */
@Controller('parking')
export class ParkingController {
  constructor(private readonly parkingService: ParkingService) {}

    /**
   * @method createSpot
   * @description Endpoint to create a new parking spot.
   *
   * @param {CreateSpotDto} createSpotDto Object received in the request body with parking spot data.
   * @returns {Promise<any>} The created parking spot.
   *
   * @example POST /parking/create
   *
   * @guards AuthGuard, RolesGuard
   * @roles admin, employee
   */
  @Post('create')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'empleado')
  createSpot(@Body() createSpotDto: CreateSpotDto): Promise<any> {
    return this.parkingService.createSpot(createSpotDto);
  }

    /**
   * @method updateSpot
   * @description Endpoint to update an existing parking spot's data.
   *
   * @param {UpdateSpotDto} updateSpotDto Object received in the request body with the data to update.
   * @returns {Promise<any>} The updated parking spot.
   *
   * @example PUT /parking/update
   *
   * @guards AuthGuard, RolesGuard
   * @roles admin, employee 
   */
  @Put('update')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'empleado')
  updateSpot(@Body() updateSpotDto: UpdateSpotDto): Promise<any> {
    return this.parkingService.updateSpot(updateSpotDto);
  }

    /**
   * @method getSpots
   * @description Endpoint to retrieve a list of all parking spots.
   *
   * @returns {Promise<any[]>} List of parking spots.
   *
   * @example GET /parking/get
   *
   * @guards AuthGuard, RolesGuard
   * @roles admin 
   */
  @Get('')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  getSpots(){
    return this.parkingService.getSpots();
  }


    /**
   * @method deleteSpot
   * @description Endpoint to physically delete a parking spot from the database.
   *
   * @param {DeleteSpotDto} deleteSpotDto Object received in the request body that contains the parking spot ID to delete.
   * @returns {Promise<any>} Confirmation message.
   *
   * @example DELETE /parking/delete
   *
   * @guards AuthGuard, RolesGuard
   * @roles admin 
   */

  @Delete('delete')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  deleteSpot(@Body() deleteSpotDto: DeleteSpotDto): Promise<any> {
    return this.parkingService.deleteSpot(deleteSpotDto);
  }

}
