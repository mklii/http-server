import { BadRequestException, Injectable } from '@nestjs/common';
import { DatabaseQueryService } from '../../database/query/databaseQuery.service';
import { MailSendService } from '../../utils/mailer/mailer.service';
import { Users } from '../../database/models/Users.model';
import { IMessage } from '../interfaces/message.interface';

@Injectable()
export class RegistrationService {
  constructor(
    private query: DatabaseQueryService,
    private mailer: MailSendService,
  ) {}
  async registration(
    username: string,
    email: string,
    password: string,
    role: number,
  ): Promise<IMessage> {
    if (role === 2) {
      if (await this.query.userInfo(null, email, null)) {
        throw new BadRequestException('User with this email already exist');
      }

      if (await this.query.userInfo(null, null, username)) {
        throw new BadRequestException('User with this username already exist');
      }

      await this.query.managerCreate(username, email, password, role);

      const newUserId: Users = await this.query.userInfo(null, email, null);

      await this.query.managerCreateRequest(newUserId.userID);
      await this.mailer.mail(
        process.env.ADMIN_MAILER_EMAIL as string,
        process.env.ADMIN_MAILER_EMAIL as string,
        'New manager registration request',
        `User with id:${newUserId.userID} want register as manager`,
      );

      return {
        message:
          'Successfully registered as user, wait for admin approve as manager',
      };
    }

    if (await this.query.userInfo(null, email, null)) {
      throw new BadRequestException('User with this email already exist');
    }

    if (await this.query.userInfo(null, null, username)) {
      throw new BadRequestException('User with this username already exist');
    }

    await this.query.userCreate(username, email, password, role);

    return { message: 'Successfully registered' };
  }
}
