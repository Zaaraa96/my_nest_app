import { IsEmail, IsString, IsOptional } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto{
    @ApiProperty({
        example: 'rehmat.sayani@gmail.com',
        required: true
     })
    @IsEmail()
    @IsOptional()
    email: string;
    
    @ApiProperty({
        example: '1234578910',
        required: true
     })
    @IsString()
    @IsOptional()
    password: string;
}