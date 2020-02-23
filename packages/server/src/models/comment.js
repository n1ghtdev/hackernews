import mongoose from 'mongoose';
import { deepPopulate } from '../utils/deepPopulate';

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
  },
  { timestamps: true },
);

// TODO: cascade deleting comments of comments

CommentSchema.pre('findOne', deepPopulate('comments')).pre(
  'find',
  deepPopulate({
    path: 'comments',
    populate: { path: 'user', select: '_id, name, role' },
  }),
);

export default mongoose.model('Comment', CommentSchema);
