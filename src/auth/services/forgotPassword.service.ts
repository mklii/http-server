import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { sign, verify } from 'jsonwebtoken';
import { secret } from '../../config/auth.config';
import { MailSendService } from '../../utils/mailer/mailer.service';
import { DatabaseQueryService } from '../../database/query/databaseQuery.service';
import { IMessage } from '../interfaces/message.interface';
import { Users } from '../../database/models/Users.model';
import { Requests } from '../../database/models/Requests.model';

@Injectable()
export class ForgotPasswordService {
  constructor(
    private mailer: MailSendService,
    private query: DatabaseQueryService,
  ) {}

  async forgot(email: string): Promise<IMessage> {
    const user: Users = await this.query.userInfo(null, email, null);
    if (!user) {
      throw new BadRequestException('User not exist');
    }

    if (await this.query.findRequestById(user.userID)) {
      throw new BadRequestException('Request already exist');
    }

    const token: string = sign({ email: email, id: user.userID }, secret);
    const forgotUrl: string = `http://${process.env.HOST}:${process.env.PORT}/reset/?token=${token}&email=${email}`;

    await this.query.changePasswordRequest(user.userID, token);
    await this.mailer.mail(
      user.email,
      process.env.ADMIN_MAILER_EMAIL as string,
      'Change password',
      forgotUrl,
    );
    return { message: 'Check your email' };
  }
}

@Injectable()
export class ResetPasswordService {
  constructor(
    private mailer: MailSendService,
    private query: DatabaseQueryService,
  ) {}
  async reset(
    email: string,
    token: string,
    newpass: string,
  ): Promise<IMessage> {
    const user: Users = await this.query.userInfo(null, email, null);
    if (!user) throw new BadRequestException('Wrong request');

    const req: Requests = await this.query.findRequestById(user.userID);

    if (req.value !== token) throw new BadRequestException('Wrong token');

    await verify(token, secret);

    await this.query.changePassword(bcrypt.hashSync(newpass, 10), email);
    await this.query.userRequestDelete(req.requestID);
    await this.mailer.mail(
      user.email,
      process.env.ADMIN_MAILER_EMAIL as string,
      'Reset password',
      'You password successfully changed',
    );
    return { message: 'Password successfully changed' };
  }
}
