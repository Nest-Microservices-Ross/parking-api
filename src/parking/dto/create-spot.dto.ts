import { IsNotEmpty, IsString } from 'class-validator';

/** 
 * @class CreateSpotDto
 * @description DTO to create a new parking spot.
 */

export class CreateSpotDto {
  @IsString()
  @IsNotEmpty()
  spotNumber: string;
}
