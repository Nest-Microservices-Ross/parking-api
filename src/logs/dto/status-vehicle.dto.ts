import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { Action } from "src/common/enum";

/**
 * @class StatusVehicleDto
 * @description DTO to log a vehicle entry or exit.
 */
export class StatusVehicleDto {

  @IsString()
  @IsNotEmpty()
  spotNumber: string;

  @IsNotEmpty()
  @IsEnum(Action)
  action: Action;

  @IsString()
  @IsNotEmpty()
  vehicleDetails: string;
}