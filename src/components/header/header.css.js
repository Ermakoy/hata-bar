import styled from 'styled-components';
import Img from 'gatsby-image';

export const Container = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1rem;
  padding-top: 1rem;

  a {
    color: #757575;
    transition: color 0.2s ease;
    text-decoration: none;

    &:hover {
      color: inherit;
    }
  }
`;

export const Avatar = styled(Img)`
  border-radius: 100%;
  height: 5em;
  object-fit: cover;
`;

export const HeaderContent = styled.h1`
  display: flex;
  align-items: center;
`;

export const StyledAvatar = styled(Avatar)`
  min-width: 80px;
  margin-right: 1.25em;
`;

export const Title = styled.p`
  margin: 0;
  padding: 0;
  font-weight: 700;
  font-size: 1.5em;
`;
