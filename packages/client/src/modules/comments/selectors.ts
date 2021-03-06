import { Comment, Comments } from './types';

export function selectCommentsByPost(comments: Comments, postId: string) {
  return Object.values(comments).filter(
    (comment: Comment) => comment.post === postId,
  );
}

export function selectCommentReplies(comments: Comments, commentIds: string[]) {
  return Object.values(comments).filter((comment: Comment) =>
    commentIds.some((id: string) => id === comment._id),
  );
}

export function selectPostCommentsCount(comments: Comments, postId: string) {
  const postComments = selectCommentsByPost(comments, postId);
  return postComments ? postComments.length : 0;
}
