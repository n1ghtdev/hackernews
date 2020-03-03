import { AuthUser } from '../auth/types';

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

export type Comment = {
  _id: string;
  parent: string;
  text: string;
  user: AuthUser;
  post: string;
  children: string[];
  createdAt: string;
  updatedAt: string;
};

export type State = {
  posts: PostList;
  post: Post | null;
};
