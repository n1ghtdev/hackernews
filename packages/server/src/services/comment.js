import CommentModel from '../models/comment';
import NewsModel from '../models/news';

export class CommentService {
  static async getByPostId(id) {
    const records = await CommentModel.find({ post: id })
      .populate({ path: 'user', select: '_id, name' })
      .exec();

    if (!records) {
      throw new Error('Not found');
    }

    return records;
  }

  static async addComment(data) {
    const commentRecord = new CommentModel(data);

    if (!commentRecord) {
      throw new Error('Cannot post comment');
    }

    await commentRecord.save(async (err, doc) => {
      if (doc.parent) {
        await CommentModel.updateOne(
          { _id: doc.parent },
          { $push: { children: doc._id } },
        );
      }
      await NewsModel.updateOne(
        { _id: doc.post },
        { $push: { comments: doc._id } },
      );
    });

    await commentRecord
      .populate({ path: 'user', select: '_id, name' })
      .execPopulate();

    return commentRecord;
  }

  static async edit(id, changedText, userId) {
    const comment = await CommentModel.findOne(
      { _id: id },
      { isDeleted: 1 },
      { user: 1 },
    ).populate({ path: 'user' });

    const isCommentEditable = !comment.isDeleted
      || comment.user._id.toString() === userId
      || comment.user.role === 'admin';

    if (isCommentEditable) {
      const changedComment = await CommentModel.findOneAndUpdate(
        { _id: id },
        { text: changedText },
        { new: true },
      ).populate({ path: 'user', select: '_id, name' });

      return changedComment;
    }

    throw new Error('Access Denied');
  }

  static async delete(id, userId) {
    const { user } = await CommentModel.findOne(
      { _id: id },
      { user: 1 },
    ).populate({ path: 'user' });

    if (user._id.toString() === userId || user.role === 'admin') {
      const deletedComment = await CommentModel.findOneAndUpdate(
        { _id: id },
        { text: '[removed]', isDeleted: true },
        { new: true },
      ).populate({ path: 'user', select: '_id, name' });

      return deletedComment;
    }

    throw new Error('Access Denied');
  }
}
