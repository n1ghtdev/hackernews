import CommentModel from '../models/comment';

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
    return commentRecord.save(async (err, doc) => {
      if (doc.parent) {
        await CommentModel.updateOne(
          { _id: doc.parent },
          { $push: { children: doc._id } },
        );
      }
    });
  }
}
