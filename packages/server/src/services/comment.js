import CommentModel from '../models/comment';
import NewsModel from '../models/news';
import UserModel from '../models/user';

export class CommentService {
  static async addComment(data) {
    const commentRecord = new CommentModel(data).save(async (err, doc) => {
      if (err) {
        throw new Error(err.message);
      }

      await NewsModel.updateOne(
        {
          _id: doc.post,
        },
        { $push: { comments: doc._id } },
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

  static async addReply(data, commentId) {
    const replyRecord = new CommentModel(data).save(async (err, doc) => {
      if (err) {
        throw new Error(err.message);
      }

      const refComment = await CommentModel.updateOne(
        { _id: commentId },
        {
          $push: {
            comments: doc._id,
          },
        },
      );

      if (refComment.ok !== 1) {
        throw new Error('Cannot add reply to comment');
      }
    });

    return replyRecord;
  }
}
