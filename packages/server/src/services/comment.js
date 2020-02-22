import CommentModel from '../models/comment';
import NewsModel from '../models/news';
import UserModel from '../models/user';

export class CommentService {
  static async getByPostId(id) {
    const records = await CommentModel.find({ post: id })
      .populate('user')
      .exec();

    if (!records) {
      throw new Error('Not Found');
    }

    return records;
  }

  static async addComment(data) {
    const commentRecord = new CommentModel(data).save(async (err, doc) => {
      if (err) {
        throw new Error(err.message);
      }
      // TODO: do not count replies to commentsCount?
      await NewsModel.updateOne(
        {
          _id: doc.post,
        },
        { $push: { comments: doc._id }, $inc: { commentsCount: 1 } },
      );

      await UserModel.updateOne(
        {
          _id: doc.user,
        },
        {
          $push: {
            comments: doc._id,
          },
        },
      );
    });

    return commentRecord;
  }
}
