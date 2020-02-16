import mongoose from 'mongoose';

const NewsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Enter news title'],
    },
    points: Number,
    source: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('News', NewsSchema);
