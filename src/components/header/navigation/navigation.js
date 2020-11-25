import React from 'react';
import { NavLink, NavContainer, NavItem, NavList } from './navigation.css';

const ROUTES = [
  {
    to: '/',
    text: 'Главная',
  },
  {
    to: '/quotes',
    text: 'Цитаты',
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
