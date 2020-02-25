import { User } from '../user/types';

export type Post = {
  _id: string;
  title: string;
  points: number;
  source: string;
  comments: Comment[] | string[];
  author: User;
  createdAt: string;
  updatedAt: string;
};

export type PostList = {
  [key: string]: Post;
};

export type Comment = {
  [key: string]: any;
};

export type State = {
  posts: PostList;
  post: Post | null;
};
