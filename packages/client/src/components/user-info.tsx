import React from 'react';
import styled from 'styled-components';

const InfoList = styled.ul`
  list-style-type: none;
  padding: 20px;
  margin: 0;
`;

const InfoItem = styled.li`
  color: ${({ theme }) => theme.textAccent};
  font-size: 14px;
  margin-bottom: 10px;
  &:last-child {
    margin-bottom: 0;
  }
`;

const ItemTitle = styled.span`
  display: inline-block;
  width: 100px;
`;
const ItemContent = styled.span``;

export function UserInfo({ children }: { children: React.ReactNode }) {
  return <InfoList>{children}</InfoList>;
}

export function UserInfoItem({
  title,
  content,
}: {
  title: string;
  content: string | number;
}) {
  return (
    <InfoItem>
      <ItemTitle>{title}</ItemTitle>
      <ItemContent>{content}</ItemContent>
    </InfoItem>
  );
}
