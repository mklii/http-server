import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailSendService } from './mailer.service';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        service: 'Gmail',
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
          user: 'sendmailerbase@gmail.com',
          pass: 'mailer_password',
        },
      },
    }),
  ],
  exports: [MailSendService],
  providers: [MailSendService],
})
export class mailerModule {}
