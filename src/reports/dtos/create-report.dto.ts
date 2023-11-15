import {
  IsString,
  IsNumber,
  Min,
  Max,
  IsLongitude,
  IsLatitude,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReportDto{
  @ApiProperty({
    example: 'toyota',
    required: true
 })
  @IsString()
  make: string;


  @ApiProperty({
    example: 'corolla',
    required: true
 })
  @IsString()
  model: string;


  @ApiProperty({
    example: 2000,
    required: true
 })
  @IsNumber()
  @Min(1930)
  @Max(2050)
  year: number;


  @ApiProperty({
    example: 2000,
    required: true
 })
  @IsNumber()
  @Min(0)
  @Max(1000000)
  mileage: number;


  @ApiProperty({
    example: 0,
    required: true
 })
  @IsLongitude()
  lng: number;


  @ApiProperty({
    example: 0,
    required: true
 })
  @IsLatitude()
  lat: number;

  
  @ApiProperty({
    example: 4500,
    required: true
 })
  @IsNumber()
  @Min(0)
  @Max(1000000)
  price: number;
}
