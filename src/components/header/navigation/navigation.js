import React from 'react';
import {
  NavLink, NavContainer, NavItem, NavList,
} from './navigation.css';

const ROUTES = [
  {
    text: 'Главная',
    to: '/',
  },
  {
    text: 'Цитаты',
    to: '/quotes',
  },
];

const Navigation = () => <NavContainer>
  <NavList>
    {ROUTES.map(({to, text}) => <NavItem key={to}>
      <NavLink to={to}>{text}</NavLink>
    </NavItem>)}
  </NavList>
</NavContainer>;
export default Navigation;
