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

  static async edit(id, changedText) {
    const changedComment = await CommentModel.findOneAndUpdate(
      { _id: id },
      { text: changedText },
      { new: true },
    ).populate({ path: 'user', select: '_id, name' });

    return changedComment;
  }

  static async delete(id) {
    try {
      const status = await CommentModel.deleteOne({ _id: id });

      if (!status.ok) {
        throw new Error({ message: 'Cannot delete comment' });
      }

      return true;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
