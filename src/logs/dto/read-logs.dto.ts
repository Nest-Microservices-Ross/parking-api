import { IsEnum, IsNumber, IsOptional } from "class-validator";
import { EventType } from "src/common/enum";

/**
 * @class ReadLogsDto
 * @description DTO to read logs from the database.
 */
export class ReadLogsDto {

  @IsNumber()
  @IsOptional()
  userId?: number;

  @IsEnum(EventType)
  @IsOptional()
  TypeEvent?: EventType;

  @IsOptional()
  referenceId?: string;

}