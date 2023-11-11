import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';

@ApiTags('User')
@Controller('auth')
export class UsersController {
    constructor(private userService: UsersService){}
    @Post('/signup')
    createUser(@Body() body:CreateUserDto){
       console.log(body) 
       return this.userService.create(body.email,body.password);
    }

    @Get('/:id')
    findUser(@Param('id') id:string){
        return this.userService.findOne(parseInt(id));
    }

    @Get()
    findAllusers(@Query('email') email: string){
        return this.userService.find(email);
    }

    @Delete('/:id')
    removeUser(@Param('id') id:string){
        return this.userService.remove(parseInt(id));
    }

    @Patch('/:id')
    updateUser(@Param('id') id: string,@Body() body:UpdateUserDto){
       console.log(body) 
       return this.userService.update(parseInt(id),body);
    }
}
