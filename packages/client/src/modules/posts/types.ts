import { User } from '../user/types';

export type Post = {
  _id?: string;
  title: string;
  points: number;
  source: string;
  author: User;
};

export type State = {
  data: Post[];
  error?: string;
};
