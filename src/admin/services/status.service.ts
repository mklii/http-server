import { BadRequestException, Injectable } from '@nestjs/common';
import { MailSendService } from '../../utils/mailer/mailer.service';
import { DatabaseQueryService } from '../../database/query/databaseQuery.service';
import { Users } from '../../database/models/Users.model';
import { IRequestAnswer } from '../interfaces/request.interface';
import { Blocklists } from '../../database/models/Blocklists.model';

@Injectable()
export class StatusService {
  constructor(
    private mailer: MailSendService,
    private query: DatabaseQueryService,
  ) {}

  async statusUpdate(
    id: number,
    status: string,
    reason: string,
  ): Promise<IRequestAnswer> {
    if (id === 1) {
      throw new BadRequestException('Admin cannot be ban or delete');
    }

    const user: Users = await this.query.userInfo(id, null, null);
    if (!user) {
      throw new BadRequestException('User not exist');
    }

    if (status === 'ban') {
      const banCheck: Blocklists = await this.query.checkUserBan(id);
      if (banCheck) {
        throw new BadRequestException('User already banned');
      }
      await this.query.userBan(id, reason);
      await this.query.changeUserTeam(id, 2);
      await this.mailer.mail(
        user.email,
        process.env.ADMIN_MAILER_EMAIL,
        'Ban',
        'Your profile were banned',
      );
      return { message: 'User was banned' };
    }

    if (status === 'unban') {
      const banCheck: Blocklists = await this.query.checkUserBan(id);
      if (!banCheck) {
        throw new BadRequestException('User not banned');
      }
      await this.query.userUnban(id);
      await this.mailer.mail(
        user.email,
        process.env.ADMIN_MAILER_EMAIL,
        'Unban',
        'Your profile were unbanned',
      );
      return { message: 'User was unbanned' };
    }

    if (status === 'delete') {
      await this.query.userDelete(id, reason);
      await this.query.changeUserTeam(id, 2);
      await this.mailer.mail(
        user.email,
        process.env.ADMIN_MAILER_EMAIL,
        'Delete',
        'Your profile were deleted',
      );
      return { message: 'User was deleted' };
    }
    throw new BadRequestException('Wrong request');
  }
}
