import { AuthUser } from '../auth/types';

export type Comments = {
  [key: string]: Comment;
};

export type Comment = {
  _id: string;
  parent: string;
  text: string;
  user: AuthUser;
  post: string;
  children: string[];
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
};
