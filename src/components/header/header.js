import React from 'react';
import posed from 'react-pose';
import {
  Container, HeaderContent,
} from './header.css';
import Navigation from './navigation/navigation';

// Example of a component-specific page transition
const AnimatedContainer = posed.div({
  enter: {
    transition: {
      ease: 'easeInOut',
    },
    y: 0,
  },
  exit: {
    transition: {
      ease: 'easeInOut',
    },
    y: '-100%',
  },
});

const Header = ({title, avatar}) => <AnimatedContainer>
  <Container>
    <HeaderContent>
      <div>
        <Navigation />
      </div>
    </HeaderContent>
  </Container>
</AnimatedContainer>;
export default Header;
