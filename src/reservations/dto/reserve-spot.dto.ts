import { IsDateString, IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class ReserveSpotDto {
  @IsString()
  @IsNotEmpty()
  spotNumber: string;  

  @IsNumber()
  clientId: number;    

  @IsString()
  @IsNotEmpty()
  carType: string;     

  @IsDateString()
  reservationStart: string; 

  @IsDateString()
  reservationEnd: string;    

  @IsNumber()
  @IsOptional()
  reservedById?: number;
}
