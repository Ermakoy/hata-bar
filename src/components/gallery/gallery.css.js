import MEDIA from 'helpers/mediaTemplates';
import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 4rem;
  margin: 2rem 0;

  ${MEDIA.TABLET`
    display: block;
  `};
`;
