import NewsModel from '../models/news';
import CommentModel from '../models/comment';

export class NewsService {
  static async create(newsInput) {
    try {
      // TODO: populate('author)
      const newsRecord = await NewsModel.create(newsInput);

      if (!newsRecord) {
        throw new Error('News entity cannot be created');
      }

      return newsRecord;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async find(id) {
    try {
      const record = await NewsModel.findOne({
        _id: id,
      }).populate({ path: 'author', select: '_id, name' });

      const comments = await CommentModel.find({
        post: id,
      }).populate({
        path: 'user',
        select: '_id, name',
      });
      if (!record) {
        throw new Error('Not Found');
      }

      const post = { ...record['_doc'], comments };
      return post;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async findAll() {
    try {
      const records = await NewsModel.find()
        .populate({ path: 'author', select: '_id, name' })
        .exec();

      if (!records) {
        throw new Error('Not Found');
      }

      return records;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async delete(id) {
    try {
      const doc = await NewsModel.findById(id);
      const status = await doc.deleteOne();

      return status;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
