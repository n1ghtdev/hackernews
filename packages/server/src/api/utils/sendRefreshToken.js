export function sendRefreshToken(res, token) {
  res.cookie('refreshToken', token, {
    httpOnly: true,
    path: '/api/auth/refresh-token',
  });
}
