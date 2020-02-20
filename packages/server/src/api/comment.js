import { Router } from 'express';
import { CommentService } from '../services/comment';
import { isAuth } from './middlewares/isAuth';

const router = Router();

router.get('/:postId', async (req, res, next) => {
  try {
    const comments = await CommentService.getByPostId(req.params.postId);
    res.json(comments).status(200);
  } catch (error) {
    next(error);
  }
});

router.post('/', isAuth, async (req, res, next) => {
  try {
    const comment = await CommentService.addComment({
      post: req.body.postId,
      user: req.user._id,
      comment: req.body.comment,
    });
    res.json(comment).status(200);
  } catch (error) {
    next(error);
  }
});

router.post('/reply', isAuth, async (req, res, next) => {
  try {
    const comment = await CommentService.addReply(
      {
        post: req.body.postId,
        user: req.user._id,
        comment: req.body.comment,
      },
      req.body.commentId,
    );
    res.json(comment).status(200);
  } catch (error) {
    next(error);
  }
});

export { router as comment };
