import {
  Link,
} from 'gatsby';
import React from 'react';
import styled from 'styled-components';

const StyledLink = styled(Link)`
  position: relative;

  &::after {
    content: '';
    width: 100%;
    height: 5px;
    background-color: #57a2db;
    position: absolute;
    left: 0;
    bottom: 0;

    opacity: 0;
    transform: translate3d(0, 100%, 0);
    transition: transform 0.3s ease-out, opacity 0.3s ease-out;
  }

  &:hover {
    padding-bottom: 5px;
    &::after {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
  }

  &.active {
    text-decoration: none;
    background-color: #57a2db;
    outline: 2px solid #57a2db;
    color: #fff;
    pointer-events: none;
  }
`;

export const NavLink = ({children, to}) => <StyledLink activeClassName='active' to={to}>
  {children}
</StyledLink>;
export const NavContainer = styled.nav`
  padding-top: 0.5em;
  padding-bottom: 0.5em;
`;

export const NavList = styled.ul`
  list-style: none;
`;

export const NavItem = styled.li`
  display: inline-block;
  padding-right: 0.5em;
`;
