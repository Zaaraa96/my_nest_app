import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query, Session, UseGuards, UseInterceptors } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { UserSession } from './interfaces/user-session.interface';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { User } from './user.entity';
import { AuthGuard } from 'src/guards/auth.guard';



@ApiTags('User')
@serialize(UserDto)
@Controller('auth')
export class UsersController {
    constructor(private userService: UsersService, private authService: AuthService){}
    @Post('/signup')
    async createUser(@Body() body:CreateUserDto ,@Session() session:UserSession){
       const user = await this.authService.signup(body.email,body.password);
       session.userId = user.id;
        return user;
    }



    @Post('/signout')
    async signOutUser(@Session() session: UserSession){
        session.userId = null;
    }

    @Post('/signin')
    async signUser(@Body() body:CreateUserDto ,@Session() session: UserSession){
        const user = await this.authService.signin(body.email,body.password);
        session.userId = user.id;
        return user;
    }

    @UseInterceptors(CurrentUserInterceptor)
    @Get('/whoami')
    async whoAmI(@CurrentUser() currentUser: User,@Session() session:UserSession){
        console.log(currentUser);
        const user = await this.userService.findOne(session.userId);
        if(!user)
        throw new BadRequestException('user not signed in');
        return user;
    }
    
    @Get('/:id')
    async findUser(@Param('id') id:string){
        const user = await this.userService.findOne(parseInt(id));
        if(!user)
        throw new NotFoundException('user not found');
        return user;
    }

    @Get()
    findAllusers(@Query('email') email: string){
        return this.userService.find(email);
    }

    @Delete('/:id')
    removeUser(@Param('id') id:string){
        return this.userService.remove(parseInt(id));
    }

    @UseGuards(AuthGuard)
    @Patch('/:id')
    updateUser(@Param('id') id: string,@Body() body:UpdateUserDto){ 
       return this.userService.update(parseInt(id),body);
    }
}
