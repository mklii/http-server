import { BadRequestException, Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailSendService {
  constructor(private readonly mailerService: MailerService) {}
  public async mail(to: string, from: string, subject: string, text: string) {
    await this.mailerService
      .sendMail({
        to: to,
        from: from,
        subject: subject,
        text: text,
      })
      .then(() => {})
      .catch((error) => {
        throw new BadRequestException(error);
      });
  }
}
