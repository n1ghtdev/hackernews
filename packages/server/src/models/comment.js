import mongoose from 'mongoose';
import { deepPopulate } from '../utils/deepPopulate';

const CommentSchema = new mongoose.Schema(
  {
    comment: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    post: { type: mongoose.Schema.Types.ObjectId, ref: 'News' },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  },
  { timestamps: true },
);

// TODO: cascade deleting comments of comments

// should only trigger on NewsModel.findOne().populate()
CommentSchema.pre('findOne', deepPopulate('comments')).pre(
  'find',
  deepPopulate('comments'),
);

export default mongoose.model('Comment', CommentSchema);
