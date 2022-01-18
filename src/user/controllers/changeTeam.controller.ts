import { Body, Controller, Get, Patch, Post, Req } from '@nestjs/common';
import { ChangeTeamService } from '../services/changeTeam.service';
import { ChangeTeamDto } from '../dto/changeTeam.dto';
import { ProfileDto } from '../dto/profile.dto';
import { IMessage } from '../interfaces/message.interface';

@Controller('team')
export class ChangeTeamController {
  constructor(private readonly changeTeamService: ChangeTeamService) {}

  @Post('enter')
  async enter(
    @Req() req: ProfileDto,
    @Body() body: ChangeTeamDto,
  ): Promise<IMessage> {
    return await this.changeTeamService.enter(req.user.id, body.teamid);
  }

  @Patch('cancel')
  async cancel(@Req() req: ProfileDto): Promise<IMessage> {
    return await this.changeTeamService.cancel(req.user.id);
  }

  @Get('leave')
  async leave(@Req() req: ProfileDto): Promise<IMessage> {
    return await this.changeTeamService.leave(req.user.id);
  }
}
