import { Module } from '@nestjs/common';
import { RegistrationController } from './controllers/registration.controller';
import { RegistrationService } from './services/registration.service';
import { LoginController } from './controllers/login.controller';
import { LoginService } from './services/login.service';
import { GoogleAuthController } from './controllers/googleAuth.controller';
import {
  GoogleAuthCallbackService,
  GoogleAuthService,
} from './services/googleAuth.service';
import { ForgotPasswordController } from './controllers/forgotPassword.controller';
import {
  ForgotPasswordService,
  ResetPasswordService,
} from './services/forgotPassword.service';
import { mailerModule } from '../utils/mailer/mailer.module';
import { DatabaseQueryModule } from '../database/query/databaseQuery.module';

@Module({
  imports: [mailerModule, DatabaseQueryModule],
  controllers: [
    RegistrationController,
    LoginController,
    GoogleAuthController,
    ForgotPasswordController,
  ],
  providers: [
    RegistrationService,
    LoginService,
    GoogleAuthService,
    GoogleAuthCallbackService,
    ForgotPasswordService,
    ResetPasswordService,
  ],
  exports: [],
})
export class AuthModule {}
