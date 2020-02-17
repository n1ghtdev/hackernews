import { Router } from 'express';
import { UserService } from '../services/user';

const router = Router();

router.get('/:id', async (req, res, next) => {
  try {
    const user = await UserService.find(req.params.id);
    res.json(user).status(200);
  } catch (error) {
    res.status(404);
    next(error);
  }
});

export { router as user };
