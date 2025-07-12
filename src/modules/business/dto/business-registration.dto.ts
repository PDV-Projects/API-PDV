import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';

export class BusinessRegistratiosDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsNotEmpty()
  owner: string

  @IsNumber()
  @IsNotEmpty()
  cnpj: number
}