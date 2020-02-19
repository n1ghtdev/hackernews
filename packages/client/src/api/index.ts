const API_URL = '/api';
const POST_API = `${API_URL}/news`;
const AUTH_API = `${API_URL}/auth`;
const USER_API = `${API_URL}/user`;
const COMMENT_API = `${API_URL}/comment`;

interface Post {
  title: string;
  source: string;
}

interface RequestedPost extends Post {
  id: string;
  points: number;
  author: User;
  comments: Comment[];
}

interface User {
  name: string;
}

interface Comment {
  comment: string;
  user: User;
  comments: Comment[];
}

/**
 * posts:
 *  -> GET news
 *  -> GET news/:id
 *  -> POST news
 *  -> DELETE news (body.id)
 * auth:
 *  -> POST signup
 *  -> POST signin
 * user:
 *  -> GET user/:id
 * comment:
 *  -> POST comment (body: {postId, comment})
 *  -> POST comment/reply (body: {postId, comment, commentId})
 */

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
  const posts = await get(POST_API);
  return posts;
}

export async function getPost(id: string) {
  const post = await get(`${POST_API}/${id}`);
  return post;
}

export async function addPost(data: any) {
  // TODO: util function to get token from localStorage
  const user = localStorage.getItem('user');
  const token = user && JSON.parse(user).token;

  const headers = { ...defaultHeaders, authorization: `Bearer ${token}` };

  const posted = await post(`${POST_API}`, data, headers);
  return posted;
}

export async function signUp(data: any) {
  logout();

  const signedUp = await post(`${AUTH_API}/signup`, data);
  localStorage.setItem('user', JSON.stringify(signedUp));

  return signedUp;
}

export async function signIn(data: any) {
  logout();

  const signedIn = await post(`${AUTH_API}/signin`, data);
  localStorage.setItem('user', JSON.stringify(signedIn));

  return signedIn;
}

export function logout() {
  const currentUser = localStorage.getItem('user');
  if (currentUser) localStorage.removeItem('user');
}
