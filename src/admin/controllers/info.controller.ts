import { Controller, Get, Query } from '@nestjs/common';
import { InfoService } from '../services/info.service';
import { IProfile, IProfilesObject } from '../interfaces/info.interface';

@Controller('info')
export class InfoController {
  constructor(private readonly infoService: InfoService) {}
  @Get('manager')
  async manager(@Query('id') id: number): Promise<IProfile> {
    return await this.infoService.manager(id);
  }

  @Get('managers')
  async managers(
    @Query('limit') limit: number,
    @Query('page') page: number,
  ): Promise<IProfilesObject> {
    return await this.infoService.managers(limit || 10, page || 1);
  }

  @Get('user')
  async user(@Query('id') id: number): Promise<IProfile> {
    return await this.infoService.user(id);
  }

  @Get('users')
  async users(
    @Query('limit') limit: number,
    @Query('page') page: number,
  ): Promise<IProfilesObject> {
    return await this.infoService.users(limit || 10, page || 1);
  }
}
