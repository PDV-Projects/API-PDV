
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop(String)
  email: string;

  @Prop(String)
  password: string;
  
  @Prop(String)
  refreshToken
}

export const UserSchema = SchemaFactory.createForClass(User);
