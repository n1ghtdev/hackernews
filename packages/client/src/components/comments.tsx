import React from 'react';

function Comment({ comment }: { comment: any }) {
  return (
    <>
      <li>{comment.comment}</li>
      {comment.comments ? <Comments comments={comment.comments} /> : null}
    </>
  );
}

export default function Comments({ comments }: { comments: any }) {
  return (
    <ul>
      {comments.map((comment: any) => (
        <Comment comment={comment} />
      ))}
    </ul>
  );
}
