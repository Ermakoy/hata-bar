import BREAKPOINTS from 'constants/breakpoints';
import {
  css,
} from 'styled-components';

// This creates the media templates, which allows for simple
// breakpoint usage inside styled-components, e.g.:
//
// ${MEDIA.PHONE`
//   font-size: 1.6rem;
// `};
//
// ${MEDIA.MIN_TABLET`
//   display: flex;
// `};
//
// Edit or add breakpoints inside constants/breakpoints.js

const MEDIA = Object.keys(BREAKPOINTS).reduce((accumulator, label) => {
  accumulator[label] = (...args) => css`
    @media (max-width: ${BREAKPOINTS[label] / 16}em) {
      ${css(...args)};
    }
  `;

  accumulator[`MIN_${label}`] = (...args) => css`
    @media (min-width: ${BREAKPOINTS[label] / 16}em) {
      ${css(...args)};
    }
  `;

  return accumulator;
}, {});

export default MEDIA;
