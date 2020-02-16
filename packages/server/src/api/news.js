import { Router } from 'express';

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    // call to services
    res.json();
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    // call to services
    res.json();
  } catch (error) {
    next(error);
  }
});

export { router as news };
