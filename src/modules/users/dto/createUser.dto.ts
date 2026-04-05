import { Prop } from '@nestjs/mongoose';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @Prop({ required: true })
  @IsNotEmpty()
  @IsString()
  email: string;

  @Prop({ required: true })
  @IsNotEmpty()
  @IsString()
  password: string;

  @Prop({ required: true })
  @IsNotEmpty()
  @IsString()
  nome: string;

  @Prop({ required: true })
  @IsNotEmpty()
  role: string;
}
