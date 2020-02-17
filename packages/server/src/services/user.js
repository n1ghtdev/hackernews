import UserModel from '../models/user';

export class UserService {
  static async find(id) {
    const userRecord = await UserModel.find({ _id: id }).exec();

    if (!userRecord) {
      throw new Error('User not found');
    }

    const user = userRecord.shift().toObject();

    delete user.password;

    return user;
  }
}
