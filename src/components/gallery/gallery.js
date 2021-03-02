import Item from 'components/gallery/item';
import PropTypes from 'prop-types';
import React from 'react';
import {
  Container,
} from './gallery.css';

const Gallery = ({items}) => <Container>
  {items.map((item, index) => <Item {...item} key={index} />)}
</Container>;
Gallery.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Gallery;
