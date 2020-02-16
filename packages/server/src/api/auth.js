import { Router } from 'express';
import { AuthService } from '../services/auth';
import { signUpValidation, signInValidation } from '../validators/auth';

const router = Router();

// TODO: refactor validators to route middlewares
router.post('/signup', async (req, res, next) => {
  const { error } = signUpValidation(req.body);

  if (error) {
    res.status(400);
    next(error);
  }

  try {
    const { user, token } = await AuthService.SignUp(req.body);
    res.status(201).json({ user, token });
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
    const { user, token } = await AuthService.SignIn(
      req.body.email,
      req.body.password,
    );
    res.json({ user, token }).status(200);
  } catch (err) {
    next(err);
  }
});

export { router as auth };
