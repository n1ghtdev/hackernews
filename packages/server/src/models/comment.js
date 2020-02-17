import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema(
  {
    comment: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    post: { type: mongoose.Schema.Types.ObjectId, ref: 'News' },
    children: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
      default: [],
    },
  },
  { timestamps: true },
);

export default mongoose.model('Comment', CommentSchema);
