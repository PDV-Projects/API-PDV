import { Prop } from '@nestjs/mongoose';
import { IsBoolean, IsEmpty, IsNotEmpty, IsString } from 'class-validator';

export class userDto {
  @Prop(String)
  @IsString()
  @IsNotEmpty()
  email: string

  @Prop(String)
  @IsString()
  @IsNotEmpty()
  password: string 
  
  @Prop(String)  
  @IsString()
  @IsNotEmpty()
  refreshToken: string

  @Prop(String)
  @IsString()
  @IsNotEmpty()
  nome: string

  @Prop(Boolean)
  @IsBoolean()
  @IsEmpty()
  verified: boolean;
}
