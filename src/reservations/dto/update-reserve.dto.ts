import { Type } from "class-transformer";
import { IsOptional } from "class-validator";


export class UpdateReservationDto {

  @Type(() => Number)
  @IsOptional()
  referenceId: number;

  @IsOptional()
  @Type(() => Number)
  clientId: number;

  @IsOptional()
  @Type(() => Number)
  parkingSpotId: number;

  @IsOptional()
  reservedById: number;

  @IsOptional()
  carType: string;

  @IsOptional()
  reservationStart: string;

  @IsOptional()
  reservationEnd: string;

}
