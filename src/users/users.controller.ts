import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('auth')
export class UsersController {
    @Post('/signup')
    createUser(@Body() body:CreateUserDto){
       console.log(body) 
    }
}
