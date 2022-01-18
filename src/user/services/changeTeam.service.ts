import { BadRequestException, Injectable } from '@nestjs/common';
import { DatabaseQueryService } from '../../database/query/databaseQuery.service';
import { MailSendService } from '../../utils/mailer/mailer.service';
import { IMessage } from '../interfaces/message.interface';
import { Users } from '../../database/models/Users.model';
import { Teams } from '../../database/models/Teams.model';
import { Requests } from '../../database/models/Requests.model';

@Injectable()
export class ChangeTeamService {
  constructor(
    private query: DatabaseQueryService,
    private mailer: MailSendService,
  ) {}

  async enter(id: number, teamid: number): Promise<IMessage> {
    const user: Users = await this.query.userInfo(id, null, null);
    const team: Teams = await this.query.findTeam(teamid);

    if (teamid === user.teamID) {
      throw new BadRequestException('You already in this team');
    }
    if (team.teamUser.length >= 11) {
      throw new BadRequestException('Team is full');
    }
    if (await this.query.findRequestById(id)) {
      throw new BadRequestException('Request already sent');
    }

    await this.query.userEnterToTeamRequest(id, teamid);
    await this.mailer.mail(
      process.env.ADMIN_MAILER_EMAIL as string,
      process.env.ADMIN_MAILER_EMAIL as string,
      `Enter to team new request`,
      `User with id:${user.userID} want to enter team:${team.teamName}`,
    );

    return { message: 'Your request successfully sent' };
  }

  async cancel(id: number) {
    const request: Requests = await this.query.findRequestById(id);

    if (!request) {
      throw new BadRequestException('You not have request');
    }

    await this.query.userRequestDelete(request.requestID);
    await this.mailer.mail(
      process.env.ADMIN_MAILER_EMAIL as string,
      process.env.ADMIN_MAILER_EMAIL as string,
      'Cancel exist request',
      `User with id:${id} cancel his request:${request.requestID}`,
    );

    return { message: 'Your request were cancel' };
  }

  async leave(id: number): Promise<IMessage> {
    const user: Users = await this.query.userInfo(id, null, null);

    if (user.teamID === 2) {
      throw new BadRequestException('You already in starter group');
    }

    await this.query.userLeaveTeamRequest(id);
    await this.mailer.mail(
      process.env.ADMIN_MAILER_EMAIL as string,
      process.env.ADMIN_MAILER_EMAIL as string,
      'Leave team new request',
      `User with id:${user.userID} want leave his team`,
    );

    return { message: 'Your request successfully sent' };
  }
}
