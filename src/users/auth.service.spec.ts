import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { User } from './user.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';

const scrypt = promisify(_scrypt);

describe('UsersAuthService', () => {
  let service: AuthService;

  const faveUsersService :Partial<UsersService> = {
    find: () => Promise.resolve([]),
    create: (email:string, password: string) => Promise.resolve({id: 1, email, password} as User)
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [AuthService, {
        provide: UsersService,
        useValue: faveUsersService
      }],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  
  it('when enter email and password user is created', async () => {
    const user = await service.signup('z@ahmadi.com', '12345');
    const [salt, passwordLength , storedHash] = user.password.split('.');
    const hash = (await scrypt('12345', salt, parseInt(passwordLength))) as Buffer;
    const result = salt + '.' + passwordLength + '.' + hash.toString('hex');
    expect(storedHash).toBe(hash.toString('hex'));
    expect(user).toEqual({id:1 , email: 'z@ahmadi.com', password: result});
  });


  
  it('when enter email that was already used, throws error in sign up', async () => {

    faveUsersService.find = ()=> Promise.resolve([
      {id:1 , email: 'z@ahmadi.com', password: '12345' } as User
    ]);


    await expect(service.signup('z@ahmadi.com', 'asdf')).rejects.toThrow(
      BadRequestException,
    );
  });




it('when enter email and password of signed up user, user can sign in', async()=>{

  const salt = randomBytes(8).toString('hex');

  const passwordLength = 32;
  // Hash the salt and the password together
  const hash = (await scrypt('12345', salt, passwordLength)) as Buffer;
  const password = salt + '.' + passwordLength + '.' + hash.toString('hex')

  faveUsersService.find = ()=> Promise.resolve([
    {id:1 , email: 'z@ahmadi.com', password } as User
  ]);

  const user = await service.signin('z@ahmadi.com', '12345');
  expect(user).toEqual({id:1 , email: 'z@ahmadi.com', password: password})
});

it('when enter email that is not signed up, throws error in sign in', async()=>{
  faveUsersService.find = ()=> Promise.resolve([]);
  await expect(service.signin('asdf@asdf.com', 'asdf')).rejects.toThrow(
    NotFoundException,
  );
});


it('when password of user is wrong, user cant sign in nad throws error', async()=>{

  const salt = randomBytes(8).toString('hex');

  const passwordLength = 32;
  // Hash the salt and the password together
  const hash = (await scrypt('12345', salt, passwordLength)) as Buffer;
  const password = salt + '.' + passwordLength + '.' + hash.toString('hex')

  faveUsersService.find = ()=> Promise.resolve([
    {id:1 , email: 'z@ahmadi.com', password } as User
  ]);

  await expect(service.signin('z@ahmadi.com', 'asdf')).rejects.toThrow(
    BadRequestException,
  );

});

});
