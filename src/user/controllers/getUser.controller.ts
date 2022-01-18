import { Controller, Get, Query } from '@nestjs/common';
import { GetUserService } from '../services/getUser.service';
import { IProfilesObject } from '../interfaces/profile.interface';

@Controller('user')
export class GetUserController {
  constructor(private readonly getUserService: GetUserService) {}

  @Get('in')
  async inteam(
    @Query('limit') limit: number,
    @Query('page') page: number,
  ): Promise<IProfilesObject> {
    return await this.getUserService.inteam(limit || 10, page || 1);
  }

  @Get('by')
  async byteam(
    @Query('limit') limit: number,
    @Query('page') page: number,
    @Query('teamid') id: number,
  ): Promise<IProfilesObject> {
    return await this.getUserService.byteam(limit || 10, page || 1, id);
  }
}
