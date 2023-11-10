import { IsEmail, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto{
    @ApiProperty({
        example: 'rehmat.sayani@gmail.com',
        required: true
     })
    @IsEmail()
    email: string;
    
    @ApiProperty({
        example: '1234578910',
        required: true
     })
    @IsString()
    password: string;
}