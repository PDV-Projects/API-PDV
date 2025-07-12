import { User } from '@database/schemas/user.schema';
import { Injectable } from '@nestjs/common';
import { Model, ObjectId } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';



@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
 
  async findOne(params: {[key: string]: any}): Promise<{user: User | null, id: ObjectId}> {
      const user = await this.userModel.findOne(params)
      
      return {user: user, id: user?.id!}
  }
  

  async findOneById(id: string) {
    const user = await this.userModel.findById(id)
    return {user: user, id: user?.id}
  }

  async update(id: ObjectId, update: { [key: string]: any}) {
    // const update = {refreshToken: token}
    this.userModel.findByIdAndUpdate(id, update, {new : true}).exec()
  }
}
