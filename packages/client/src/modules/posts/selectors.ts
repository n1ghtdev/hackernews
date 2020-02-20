import { PostList } from './types';

export function selectPosts(state: PostList) {
  return Object.keys(state).map((key: string) => state[key]);
}
