### Hackernews clone with MERN-stack

#### server

- [x] user/auth
- [x] news posts
- [x] auth with jwt
- [x] protected routes
- [x] user/news relation (mongo refs)
- [x] add post id to user news array with mongo pre hook (prev('save'))
- [x] add user/post comments
- [x] deep population post comments (n-level)
- [ ] delete post/comments relation (also delete from user posts/comments)
- [ ] posts pagination
- [ ] logger
- [ ] use post slug instead of id
- [ ] validate new post

#### client

- [x] redux
  - [x] user module
  - [x] posts module
- [x] posts page
- [ ] auth page
- [ ] user page
- [ ] post page
- [ ] add new post page
