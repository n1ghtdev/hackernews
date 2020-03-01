import { Router } from 'express';
import { AuthService } from '../services/auth';
import { signUpValidation, signInValidation } from '../validators/auth';
import { sendRefreshToken } from './utils/sendRefreshToken';

const router = Router();

// TODO: refactor validators to route middlewares
router.post('/signup', async (req, res, next) => {
  const { error } = signUpValidation(req.body);

  if (error) {
    res.status(400);
    next(error);
  }

  try {
    const { user, accessToken, refreshToken } = await AuthService.SignUp(
      req.body,
    );

    sendRefreshToken(res, refreshToken);
    return res.send({ user, accessToken }).status(201);
  } catch (err) {
    next(err);
  }
});

router.post('/signin', async (req, res, next) => {
  const { error } = signInValidation(req.body);

  if (error) {
    res.status(400);
    next(error);
  }

  try {
    const { user, accessToken, refreshToken } = await AuthService.SignIn(
      req.body.email,
      req.body.password,
    );

    sendRefreshToken(res, refreshToken);
    return res.send({ user, accessToken }).status(200);
  } catch (err) {
    next(err);
  }
});

router.post('/logout', (req, res) => {
  res.clearCookie('refreshToken', { path: '/api/auth/refresh-token' });
  return res.send({ message: 'Logged out' }).status(200);
});

router.post('/refresh-token', async (req, res, next) => {
  const token = req.cookies.refreshToken;

  if (!token) {
    return res.status(401).send({ message: 'Session Expired' });
  }

  try {
    const { user, accessToken, refreshToken } = await AuthService.updateTokens(
      token,
    );

    sendRefreshToken(res, refreshToken);
    return res.send({ user, accessToken }).status(200);
  } catch (err) {
    next(err);
  }
});

export { router as auth };
