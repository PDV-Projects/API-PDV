import { Prop } from '@nestjs/mongoose';
import { IsBoolean, IsEmpty, IsNotEmpty, IsString } from 'class-validator';

export class userDto {
  @Prop({ required: true, lowercase: true })
  @IsString()
  @IsNotEmpty()
  email: string;

  @Prop({ required: true })
  @IsString()
  @IsNotEmpty()
  password: string;

  @Prop()
  @IsString()
  refreshToken: string;

  @Prop({ required: true })
  @IsString()
  @IsNotEmpty()
  nome: string;

  @Prop({ required: true, default: false })
  @IsBoolean()
  @IsEmpty()
  verified: boolean;

  @Prop()
  @IsString()
  role: string;
}
