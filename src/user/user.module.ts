import { Module } from '@nestjs/common';
import { DatabaseQueryModule } from '../database/query/databaseQuery.module';
import { mailerModule } from '../utils/mailer/mailer.module';
import { ProfileController } from './controllers/profile.controller';
import { ProfileService } from './services/profile.service';
import { ChangeTeamController } from './controllers/changeTeam.controller';
import { ChangeTeamService } from './services/changeTeam.service';
import { ChangeProfileController } from './controllers/changeProfile.controller';
import { ChangeProfileService } from './services/changeProfile.service';
import { GetUserController } from './controllers/getUser.controller';
import { GetUserService } from './services/getUser.service';

@Module({
  imports: [mailerModule, DatabaseQueryModule],
  controllers: [
    ProfileController,
    ChangeTeamController,
    ChangeProfileController,
    GetUserController,
  ],
  providers: [
    ProfileService,
    ChangeTeamService,
    ChangeProfileService,
    GetUserService,
  ],
  exports: [],
})
export class UserModule {}
