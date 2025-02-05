import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";


/** 
 * @class UpdateSpotDto
 * @description DTO to update an existing parking spot.
 */

export class UpdateSpotDto {

  @IsString()
  @IsNotEmpty()
  spotNumber: string;  

  @IsNumber()
  clientId: number;    

  @IsString()
  @IsOptional()
  carType: string;     

  @IsNumber()
  @IsOptional()
  reservedById?: number;
}