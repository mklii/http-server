import { Body, Controller, Put } from '@nestjs/common';
import { StatusService } from '../services/status.service';
import { StatusDto } from '../dto/status.dto';
import { IRequestAnswer } from '../interfaces/request.interface';

@Controller('status')
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @Put('update')
  async statusUpdate(@Body() body: StatusDto): Promise<IRequestAnswer> {
    return await this.statusService.statusUpdate(
      body.id,
      body.status,
      body.reason,
    );
  }
}
