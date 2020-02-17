import mongoose from 'mongoose';

const NewsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Enter news title'],
    },
    points: {
      type: Number,
      default: 0,
    },
    source: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  },
  {
    timestamps: true,
  },
);

function deepPopulate(next) {
  this.populate('children');
  next();
}

NewsSchema.pre('findOne', deepPopulate).pre('find', deepPopulate);

NewsSchema.pre('save', function (next) {
  const postId = this._id;
  const authorId = this.author;

  try {
    this.model('User').updateOne(
      { _id: authorId },
      { $push: { news: postId } },
      next,
    );
  } catch (error) {
    next(error);
  }
});

export default mongoose.model('News', NewsSchema);
