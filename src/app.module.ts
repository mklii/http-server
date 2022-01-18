import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { mailerModule } from './utils/mailer/mailer.module';
import { DatabaseQueryModule } from './database/query/databaseQuery.module';
import { UserModule } from './user/user.module';
import { VerifyTokenMiddleware } from './middleware/verifyToken.middleware';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AdminModule } from './admin/admin.module';
import {
  AccessCheckMiddleware,
  AccessManagerCheckMiddleware,
} from './middleware/accessCheck.middleware';
import { BanCheckMiddleware } from './middleware/banCheck.middleware';
import { LogCreateMiddleware } from './logs/middleware/logCreate.middleware';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    mailerModule,
    DatabaseQueryModule,
    UserModule,
    AdminModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'uploadImages'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [mailerModule, DatabaseQueryModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(VerifyTokenMiddleware)
      .forRoutes(
        'profile',
        'team',
        'change',
        'user',
        'info',
        'request',
        'status',
      );
    consumer
      .apply(AccessCheckMiddleware)
      .forRoutes(
        'request/manager',
        'info/manager',
        'info/managers',
        'request/update',
        'status',
      );
    consumer.apply(AccessManagerCheckMiddleware).forRoutes('request', 'info');
    consumer
      .apply(BanCheckMiddleware)
      .forRoutes(
        'profile',
        'team',
        'change',
        'user',
        'info',
        'request',
        'status',
      );
    consumer
      .apply(LogCreateMiddleware)
      .forRoutes(
        'profile',
        'team',
        'change',
        'user',
        'info',
        'request',
        'status',
        'forgot',
        'google',
        'login',
        'registration',
      );
  }
}
