import { User } from '../user/types';

export type Post = {
  title: string;
  points: number;
  source: string;
  author: User;
};

export type State = {
  data: Post[];
  error?: string;
};
