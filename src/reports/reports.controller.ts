import { Body, Controller, Get, Post, Session, UseGuards, UseInterceptors } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { AuthGuard } from '../guards/auth.guard';
import { CreateReportDto } from './dtos/create-report.dto';
import { CurrentUserInterceptor } from '../users/interceptors/current-user.interceptor';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { User } from 'src/users/user.entity';
import { ApiTags } from '@nestjs/swagger';
import { serialize } from '../interceptors/serialize.interceptor';
import { ReportDto } from './dtos/report.dto';


@serialize(ReportDto)
@ApiTags('Report')
@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Post()
  @UseGuards(AuthGuard)
  @UseInterceptors(CurrentUserInterceptor)
  createReport(@Body() body: CreateReportDto,@CurrentUser() currentUser: User,) {
    return this.reportsService.create(body, currentUser);
  }

  @Get()
  findAllReports(){
      return this.reportsService.find();
  }
} 
