import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema(
  {
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
      default: null,
    },
    text: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    post: { type: mongoose.Schema.Types.ObjectId, ref: 'News' },
    children: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export default mongoose.model('Comment', CommentSchema);
