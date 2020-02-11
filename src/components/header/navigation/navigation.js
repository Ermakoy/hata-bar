import React from 'react';
import { NavLink, NavContainer, NavItem, NavList } from './navigation.css';

const ROUTES = [
  {
    to: '/',
    text: 'Обо мне',
  },
  {
    to: '/timeline',
    text: 'Таймлайн',
  },
  {
    to: '/pokushat',
    text: 'Покушать',
  },
];

const Navigation = () => (
  <NavContainer>
    <NavList>
      {ROUTES.map(({ to, text }) => (
        <NavItem key={to}>
          <NavLink to={to}>{text}</NavLink>
        </NavItem>
      ))}
    </NavList>
  </NavContainer>
);

export default Navigation;
