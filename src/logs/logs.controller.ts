
import { LogsService } from './logs.service';
import { Controller, Get, Post, Body, UseGuards, Query, Put, Delete, Param, HttpException, HttpStatus } from '@nestjs/common';
import { Roles } from 'src/auth/decorators';
import { AuthGuard, RolesGuard } from 'src/common/guards';
import { ReadLogsDto, StatusVehicleDto, UpdateLogsDto } from './dto';



@Controller('logs')
export class LogsController {
  constructor(private readonly logsService: LogsService) {}

  @Get('')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  getLogs(@Query() readLogsDto: ReadLogsDto) {
    return this.logsService.getLogs(readLogsDto);
  }

  @Post('status-vehicle')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('empleado', 'admin')
  logVehicleEntry(@Body() statusVehicleDto: StatusVehicleDto) {
    return this.logsService.logVehicleEntry(statusVehicleDto);
  }

  @Put('update-logs')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  updateLogs(@Body() updateLogsDto: UpdateLogsDto) {
    return this.logsService.updateLogs(updateLogsDto);
  }
}
