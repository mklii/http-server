import { Body, Controller, Get, Put, Query } from '@nestjs/common';
import { RequestService } from '../services/request.service';
import {
  IRequestAnswer,
  IRequestsObject,
} from '../interfaces/request.interface';
import { RequestDto } from '../dto/request.dto';

@Controller('request')
export class RequestController {
  constructor(private readonly requestService: RequestService) {}

  @Get('user')
  async userRequest(
    @Query('limit') limit: number,
    @Query('page') page: number,
  ): Promise<IRequestsObject> {
    return await this.requestService.user(limit || 10, page || 1);
  }

  @Get('manager')
  async managerRequest(
    @Query('limit') limit: number,
    @Query('page') page: number,
  ): Promise<IRequestsObject> {
    return await this.requestService.manager(limit || 10, page || 1);
  }

  @Put('update')
  async requestUpdate(@Body() body: RequestDto): Promise<IRequestAnswer> {
    return await this.requestService.update(body.requestid, body.status);
  }
}
