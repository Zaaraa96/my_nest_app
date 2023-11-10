import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';


@Module({
  imports:[
    TypeOrmModule.forFeature([User]) //this creates the repository for us
  ],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
