import { Module } from '@nestjs/common';
import { mailerModule } from '../utils/mailer/mailer.module';
import { DatabaseQueryModule } from '../database/query/databaseQuery.module';
import { InfoController } from './controllers/info.controller';
import { InfoService } from './services/info.service';
import { RequestController } from './controllers/request.controller';
import { RequestService } from './services/request.service';
import { StatusController } from './controllers/status.controller';
import { StatusService } from './services/status.service';

@Module({
  imports: [mailerModule, DatabaseQueryModule],
  controllers: [InfoController, RequestController, StatusController],
  providers: [InfoService, RequestService, StatusService],
  exports: [],
})
export class AdminModule {}
