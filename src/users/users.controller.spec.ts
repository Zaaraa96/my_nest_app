import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { Session } from '@nestjs/common';
import { UserSession } from './interfaces/user-session.interface';
import { User } from './user.entity';

describe('UsersController', () => {
  let controller: UsersController;
  let fakeAuthService: Partial<AuthService> ={
    signup: null
  };
  let fakeUserService: Partial<UsersService> = {
    
  };


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers:[
        {
          provide: UsersService,
          useValue: fakeUserService
        },
        {
          provide: AuthService,
          useValue: fakeAuthService
        }
      ]
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  //createUser test
  it('create user test', async () => {

    fakeAuthService.signup = (email: string, password: string) => 
    Promise.resolve( { id:1, email, password } as User);

     let session :UserSession = {userId: null};
   const user = await controller.createUser({email: 'z@ahmadi.com', password: '1234'} as CreateUserDto, session)
    
    expect(user).toEqual({id:1, email: 'z@ahmadi.com', password: '1234'});
    expect(session.userId).toBe(1);
  });

  //signin test


});
