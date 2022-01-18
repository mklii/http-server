import { BadRequestException, Injectable } from '@nestjs/common';
import { DatabaseQueryService } from '../../database/query/databaseQuery.service';
import { MailSendService } from '../../utils/mailer/mailer.service';
import * as bcrypt from 'bcrypt';
import * as fs from 'fs';
import { IMessage } from '../interfaces/message.interface';
import { Users } from '../../database/models/Users.model';

@Injectable()
export class ChangeProfileService {
  constructor(
    private query: DatabaseQueryService,
    private mailer: MailSendService,
  ) {}

  async name(name: string, email: string): Promise<IMessage> {
    const user: Users = await this.query.userInfo(null, null, name);
    if (user) {
      throw new BadRequestException('Username already exist');
    }

    await this.query.changeName(name, email);
    await this.mailer.mail(
      email as string,
      process.env.ADMIN_MAILER_EMAIL as string,
      'Change name',
      'You successfully changed username',
    );

    return { message: 'Username successfully changed' };
  }

  async password(password: string, email: string): Promise<IMessage> {
    await this.query.changePassword(bcrypt.hashSync(password, 10), email);
    await this.mailer.mail(
      email as string,
      process.env.ADMIN_MAILER_EMAIL as string,
      'Change password',
      'You successfully changed password',
    );

    return { message: 'Password successfully changed' };
  }

  async avatar(file: Express.Multer.File, email: string): Promise<IMessage> {
    if (!file) {
      throw new BadRequestException('Invalid file');
    }
    const user: Users = await this.query.userInfo(null, email, null);

    if (fs.existsSync(user.avatarImage)) {
      fs.unlinkSync(user.avatarImage);
    }

    await this.query.changeAvatar(file, email);
    await this.mailer.mail(
      email as string,
      process.env.ADMIN_MAILER_EMAIL as string,
      'Change avatar',
      'You successfully changed avatar',
    );

    return { message: 'Avatar successfully changed' };
  }
}
