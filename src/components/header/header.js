import React from 'react';
import PropTypes from 'prop-types';
import posed from 'react-pose';
import { Container, StyledAvatar, HeaderContent, Title } from './header.css';
import Navigation from './navigation/navigation';

// Example of a component-specific page transition
const AnimatedContainer = posed.div({
  enter: {
    y: 0,
    transition: {
      ease: 'easeInOut',
    },
  },
  exit: {
    y: '-100%',
    transition: {
      ease: 'easeInOut',
    },
  },
});

const Header = ({ title, avatar }) => (
  <AnimatedContainer>
    <Container>
      <HeaderContent>
        <StyledAvatar fixed={avatar} />
        <div>
          <Title>{title}</Title>
          <Navigation />
        </div>
      </HeaderContent>
    </Container>
  </AnimatedContainer>
);

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
