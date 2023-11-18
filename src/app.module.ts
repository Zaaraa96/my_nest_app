import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { Report } from './reports/report.entity';
import { APP_PIPE } from '@nestjs/core';
import {ConfigModule, ConfigService } from '@nestjs/config';
import { GeneralResponseMiddleware } from './middlewares/general';
import dbConfig from './config/db.config';

const cookieSession = require('cookie-session'); 

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
      load: [dbConfig],
    }),
    // TypeOrmModule.forRoot(),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        ...(await configService.get('database')),
      }),
    }),
    UsersModule, ReportsModule],
  controllers: [AppController],
  providers: [AppService,
  {
    provide: APP_PIPE,
    useValue: new ValidationPipe({ whitelist: true }),
  }
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer){
    //set middlewares on every incoming requests!
    consumer.apply(
      cookieSession({keys:['asdfghj']})
    ).forRoutes('*');
    consumer
      .apply(GeneralResponseMiddleware)
      .forRoutes('*');
  }
}


