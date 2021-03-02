import Img from 'gatsby-image';
import PropTypes from 'prop-types';
import React from 'react';
import {
  Title, Copy,
} from './item.css';

const Item = ({title, copy, image}) => <figure>
  <Img alt={title} fluid={image ? image.childImageSharp.fluid : {}} />
  <figcaption>
    <Title>{title}</Title>
    <Copy>{copy}</Copy>
  </figcaption>
</figure>;
Item.propTypes = {
  copy: PropTypes.string,
  image: PropTypes.object.isRequired,
  title: PropTypes.string,
};

export default Item;
