import { Router } from 'express';
import { NewsService } from '../services/news';
import { isAuth } from './middlewares/isAuth';

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const records = await NewsService.findAll();
    res.json(records).status(200);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const record = await NewsService.find(req.body.id);
    res.json(record).status(200);
  } catch (error) {
    next(error);
  }
});

router.post('/', isAuth, async (req, res, next) => {
  try {
    const record = await NewsService.create({
      ...req.body,
      author: req.user._id,
    });
    res.json(record).status(200);
  } catch (error) {
    next(error);
  }
});

export { router as news };
