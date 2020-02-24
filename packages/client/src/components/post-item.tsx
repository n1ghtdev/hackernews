import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Post } from '../modules/posts/types';

type Props = {
  post: Post;
};

const Wrapper = styled.article`
  padding: 5px;
  background-color: #ddd;
`;

const Title = styled.h2`
  display: inline-block;
  font-size: 14px;
  font-weight: normal;
  a {
    color: ${({ theme }: { theme: any }) => theme.text};
  }
  margin-bottom: 5px;
`;

const Source = styled.a`
  font-size: 12px;
  margin-left: 10px;
`;

const Info = styled.div`
  font-size: 12px;
  color: ${({ theme }: { theme: any }) => theme.textAccent};
`;

export default function PostItem(props: Props) {
  const { post } = props;
  return (
    <Wrapper>
      <Title>
        <Link to={`/post/${post._id}`}>{post.title}</Link>
        <Source href={post.source} target="_blank" rel="noopener noreferrer">
          ({post.source})
        </Source>
      </Title>
      <Info>
        <span>
          {post.points} points by {post.author?.name || 'anonymous'} at{' '}
          {post.createdAt} {'|'} {post.comments?.length} comments
        </span>
      </Info>
    </Wrapper>
  );
}
