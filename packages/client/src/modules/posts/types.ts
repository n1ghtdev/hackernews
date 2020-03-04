import { AuthUser } from '../auth/types';
import { Comment } from '../comments/types';

// TODO: add separate type for single post

export type Post = {
  _id: string;
  title: string;
  points: number;
  source: string;
  comments: Comment[] | string[];
  author: AuthUser;
  createdAt: string;
  updatedAt: string;
};

export type PostList = {
  [key: string]: Post;
};
