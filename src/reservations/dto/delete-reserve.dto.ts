import { Type } from "class-transformer";
import { IsOptional } from "class-validator";



export class DeleteReservationDto {

  @IsOptional()
  @Type(() => Number)
  referenceId: number;

}