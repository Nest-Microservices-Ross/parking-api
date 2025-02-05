import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { EventType } from "src/common/enum";



export class UpdateLogsDto {

  @IsString()
  id: string;

  @IsOptional()
  @IsNumber()
  userId: number;

  @IsOptional()
  @IsEnum(EventType)
  TypeEvent: EventType;

  @IsOptional()
  @IsString()
  referenceId: string;
}