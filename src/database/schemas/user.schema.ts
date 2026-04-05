import { userDto } from '@modules/users/dto/user.dto';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({
  timestamps: true,
})
export class User extends userDto {
  declare verified: false;
}

export const UserSchema = SchemaFactory.createForClass(User);
