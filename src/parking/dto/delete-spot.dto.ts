import { IsString } from 'class-validator';

/** 
 * @class DeleteSpotDto
 * @description DTO to delete a parking spot.
 */


export class DeleteSpotDto {
  @IsString()
  spotNumber: string;
}
