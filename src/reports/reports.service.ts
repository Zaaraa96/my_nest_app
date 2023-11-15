import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dtos/create-report.dto';
import { Report } from "../reports/report.entity";
import { User } from 'src/users/user.entity';

@Injectable()
export class ReportsService {
 
  constructor(@InjectRepository(Report) private repo: Repository<Report>) {}

  create(reportDto: CreateReportDto,currentUser: User,) {
    const report = this.repo.create(reportDto as Partial<Report>,);
    report.user = currentUser;
    return this.repo.save(report);
  }

  find() {
    return this.repo.find();
  }
}
