import { Post } from '../modules/posts/types';
import { AuthUser } from '../modules/auth/types';
import { User } from '../modules/users/types';
import { Comment } from '../modules/comments/types';

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

  const json = await response.json();

  if (response.ok) {
    return json;
  }

  throw new Error(json.message);
}

async function post<T>(
  url: string,
  body?: Partial<T>,
  headers: any = defaultHeaders,
): Promise<T> {
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'include',
    headers,
    body: body && JSON.stringify(body),
  });

  const json = await response.json();

  if (response.ok) {
    return json;
  }

  throw new Error(json.message);
}

/**** POSTS */

export async function getPosts() {
  const posts = await get<Post[]>(POST_API);
  return posts;
}

export async function getPost(id: string) {
  const post = await get<Post>(`${POST_API}/${id}`);
  return post;
}

export async function addPost(data: Partial<Post>, token: string) {
  const headers = { ...defaultHeaders, authorization: `Bearer ${token}` };

  const posted = await post<Post>(`${POST_API}`, data, headers);
  return posted;
}

/**** COMMENTS */

export async function getComments(postId: string) {
  const response = await get<Comment[]>(`${COMMENT_API}/${postId}`);
  return response;
}

export async function addComment(data: Partial<Comment>, token: string) {
  const headers = { ...defaultHeaders, authorization: `Bearer ${token}` };

  const posted = await post<Comment>(`${COMMENT_API}`, data, headers);
  return posted;
}

/**** AUTH */

export async function signUp(data: Partial<AuthUser>) {
  const signedUp = await post<AuthUser>(`${AUTH_API}/signup`, data);
  return signedUp;
}

export async function signIn(data: Partial<AuthUser>) {
  const signedIn = await post<AuthUser>(`${AUTH_API}/signin`, data);
  return signedIn;
}

export async function verifyAuth() {
  const response = await post<AuthUser>(`${AUTH_API}/refresh-token`);
  return response;
}

export async function logout() {
  const loggedOut = await post<boolean>(`${AUTH_API}/logout`);
  return loggedOut;
}

/**** USER */

export async function getUser(id: string) {
  const response = await get<User>(`${USER_API}/${id}`);
  return response;
}
