import { BadRequestException, Injectable } from '@nestjs/common';
import { MailSendService } from '../../utils/mailer/mailer.service';
import { DatabaseQueryService } from '../../database/query/databaseQuery.service';
import { Users } from '../../database/models/Users.model';
import { profile } from '../mappers/profile.mapper';
import { IProfile, IProfilesObject } from '../interfaces/profile.interface';

@Injectable()
export class GetUserService {
  constructor(
    private mailer: MailSendService,
    private query: DatabaseQueryService,
  ) {}

  async inteam(limit: number, page: number): Promise<IProfilesObject> {
    const data: Users[] = await this.query.allUserInTeam(page, limit);
    const returnData: IProfile[] = data.map((value: Users): IProfile => {
      return profile(value);
    });

    return { users: returnData, total: returnData.length };
  }

  async byteam(
    limit: number,
    page: number,
    id: number,
  ): Promise<IProfilesObject> {
    if (!id) throw new BadRequestException('Wrong teamid');

    const data: Users[] = await this.query.allUserByTeam(page, limit, id);
    const returnData: IProfile[] = data.map((value: Users): IProfile => {
      return profile(value);
    });

    return { users: returnData, total: returnData.length };
  }
}
