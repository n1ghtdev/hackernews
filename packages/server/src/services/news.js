import NewsModel from '../models/news';

export class NewsService {
  static async create(newsInput) {
    try {
      // TODO: populate('author)
      const newsRecord = await NewsModel.create(newsInput);
      // const newsRecord = new NewsModel(newsInput);

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
      }).populate('comments');

      if (!record) {
        throw new Error('Not Found');
      }

      return record;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async findAll() {
    try {
      const records = await NewsModel.find()
        .populate('author')
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
      // const status = (deletedCount > 1 && ok === 1) || false;
      console.log(status);
      if (!status) {
        throw new Error('Deleting Failed');
      }

      return status;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
