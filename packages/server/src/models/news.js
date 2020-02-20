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

NewsSchema.pre('deleteOne', { document: true }, function (next) {
  const postId = this._id;
  const commentIds = this.comments;

  try {
    this.model('Comment').deleteMany({ post: postId, _id: commentIds }, err => {
      if (err) {
        throw new Error(err.message);
      }
      next();
    });
  } catch (error) {
    next(error);
  }
});

export default mongoose.model('News', NewsSchema);
