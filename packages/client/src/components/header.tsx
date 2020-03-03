import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../modules/reducers';
import { logoutRequest } from '../modules/auth/actions';

const Wrapper = styled.header`
  background: ${({ theme }) => theme.primary};
  margin: 0 -15px;
  padding: 5px 20px;
`;
const Nav = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
  display: flex;
`;
const NavItem = styled.li`
  font-size: 14px;
  margin-right: 20px;
  &:last-child {
    margin-right: 0;
    flex: 1;
    text-align: right;
  }
  & > a {
    color: ${({ theme }) => theme.text};
    &:hover {
      text-decoration: underline;
    }
  }
`;
const Title = styled.h1`
  font-size: 14px;
`;
const Logout = styled.button`
  background: none;
  border: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export default function Header() {
  const dispatch = useDispatch();
  const isSignedIn = useSelector((state: RootState) => state.auth.isAuth);

  function onLogout() {
    dispatch(logoutRequest());
  }

  return (
    <Wrapper>
      <Nav>
        <NavItem>
          <NavLink to="/">
            <Title>Hacker News Clone</Title>
          </NavLink>
        </NavItem>
        {!isSignedIn ? (
          <NavItem>
            <NavLink to="/auth">signup/signin</NavLink>
          </NavItem>
        ) : (
          <>
            <NavItem>
              <NavLink to="/add-post">add new post</NavLink>
            </NavItem>
            <NavItem>
              <Logout onClick={onLogout}>logout</Logout>
            </NavItem>
          </>
        )}
      </Nav>
    </Wrapper>
  );
}
