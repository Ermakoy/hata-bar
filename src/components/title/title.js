import PropTypes from 'prop-types';
import React from 'react';
import {
  Text,
} from './title.css';

const Title = ({children, as = 'span', size}) => <Text as={as} size={size}>
  {children}
</Text>;
Title.propTypes = {
  as: PropTypes.string,
  children: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['large']),
};

export default Title;
