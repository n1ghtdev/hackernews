import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 4,
      max: 16,
    },
    email: {
      type: String,
      reuqired: true,
      min: 6,
      max: 64,
    },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 1024,
    },
    refreshToken: String,
    role: {
      type: String,
      default: 'user',
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  },
);

export default mongoose.model('User', UserSchema);
