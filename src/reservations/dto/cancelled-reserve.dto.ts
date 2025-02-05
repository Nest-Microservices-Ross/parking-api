import { Type } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";


export class CancellReserveDto {



  @IsNotEmpty()
  @Type(() => Number)
  referenceId: number;

}