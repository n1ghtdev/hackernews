import { Post, Comment } from '../modules/posts/types';

const API_URL = '/api';
const POST_API = `${API_URL}/news`;
const AUTH_API = `${API_URL}/auth`;
const USER_API = `${API_URL}/user`;
const COMMENT_API = `${API_URL}/comment`;

const defaultHeaders = { 'content-type': 'application/json' };

async function get<T>(url: string, headers: any = defaultHeaders): Promise<T> {
  const response = await fetch(url, {
    headers,
  });

  if (response.ok) {
    return await response.json();
  }

  throw new Error(await response.json());
}

async function post<T>(
  url: string,
  body: any,
  headers: any = defaultHeaders,
): Promise<T> {
  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  });
  const json = await response.json();

  if (response.ok) {
    return json;
  }

  throw new Error(json.message);
}

export async function getPosts() {
  const posts = await get<Post[]>(POST_API);
  return posts;
}

export async function getPost(id: string) {
  const post = await get<Post>(`${POST_API}/${id}`);
  return post;
}

export async function addPost(data: Partial<Post>) {
  // TODO: util function to get token from localStorage
  const user = localStorage.getItem('user');
  const token = user && JSON.parse(user).token;

  const headers = { ...defaultHeaders, authorization: `Bearer ${token}` };

  const posted = await post<Partial<Post>>(`${POST_API}`, data, headers);
  return posted;
}

export async function addComment(data: Partial<Comment>) {
  const user = localStorage.getItem('user');
  const token = user && JSON.parse(user).token;

  const headers = { ...defaultHeaders, authorization: `Bearer ${token}` };

  const posted = await post<Partial<Comment>>(`${COMMENT_API}`, data, headers);
  return posted;
}

export async function signUp(data: any) {
  clearUser();

  const signedUp = await post(`${AUTH_API}/signup`, data);
  localStorage.setItem('user', JSON.stringify(signedUp));

  return signedUp;
}

export async function signIn(data: any) {
  clearUser();

  const signedIn = await post(`${AUTH_API}/signin`, data);
  localStorage.setItem('user', JSON.stringify(signedIn));

  return signedIn;
}

export function clearUser() {
  const currentUser = localStorage.getItem('user');
  if (currentUser) localStorage.removeItem('user');
}

export async function getComments(postId: string) {
  const comments = await get(`${COMMENT_API}/${postId}`);
  return comments;
}
