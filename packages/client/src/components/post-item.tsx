import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import TimeAgo from 'react-timeago';
import { Post } from '../modules/posts/types';

type Props = {
  post: Post;
  index?: number;
};

const Wrapper = styled.article`
  padding: 5px;
`;

const Title = styled.h2`
  display: inline-block;
  font-size: 14px;
  font-weight: normal;
  a {
    color: ${({ theme }) => theme.text};
  }
  margin-bottom: 5px;
`;

const Source = styled.a`
  font-size: 12px;
  margin-left: 10px;
`;

const Info = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.textAccent};
`;

const Author = styled(Link)`
  color: inherit;
  &:hover {
    text-decoration: underline;
  }
`;

export default function PostItem(props: Props) {
  const { post, index } = props;
  return (
    <Wrapper>
      <Title>
        {index ? <span>{index}. </span> : null}
        <Link to={`/post/${post._id}`}>{post.title}</Link>
        <Source href={post.source} target="_blank" rel="noopener noreferrer">
          ({post.source})
        </Source>
      </Title>
      <Info>
        <span>
          {post.points} points by{' '}
          <Author to={`/user/${post.author?._id}`}>{post.author?.name}</Author>{' '}
          at <TimeAgo date={post.createdAt} live={false} /> {'|'}{' '}
          {post.comments?.length} comments
        </span>
      </Info>
    </Wrapper>
  );
}
