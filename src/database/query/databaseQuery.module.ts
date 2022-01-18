import { Module } from '@nestjs/common';
import { DatabaseQueryService } from './databaseQuery.service';

@Module({
  providers: [DatabaseQueryService],
  exports: [DatabaseQueryService],
})
export class DatabaseQueryModule {}
