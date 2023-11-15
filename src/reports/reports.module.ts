import { Module } from '@nestjs/common';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Report} from './report.entity';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Report, User])],
  controllers: [ReportsController],
  providers: [ReportsService, UsersService]
})
export class ReportsModule {}
