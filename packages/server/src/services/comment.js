import CommentModel from '../models/comment';
import NewsModel from '../models/news';

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

    return commentRecord;
  }
}
