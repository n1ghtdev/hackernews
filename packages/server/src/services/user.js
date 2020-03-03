import UserModel from '../models/user';
import NewsModel from '../models/news';
import CommentModel from '../models/comment';

export class UserService {
  static async find(id) {
    const userRecord = await UserModel.find({ _id: id }).exec();

    if (!userRecord) {
      throw new Error('User not found');
    }

    const posts = await NewsModel.find({ author: id }).exec();
    const comments = await CommentModel.find({ user: id }).exec();

    const user = userRecord.shift().toObject();

    delete user.password;
    delete user.refreshToken;

    return { ...user, postCount: posts.length, commentCount: comments.length };
  }
}
