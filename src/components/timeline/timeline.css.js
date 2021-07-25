/* eslint-disable filenames/match-regex */
import {
  Box,
} from 'rendition';
import styled, {
  keyframes, css,
} from 'styled-components';

const grayscale = keyframes`
  100%,0%{
    opacity: 1;
  }
  50% {
    opacity: 0.1;
  }
`;

export const Month = styled.div`
  display: grid;
  margin-top: 5px;
  margin-bottom: 20px;
  grid-template-columns: repeat(7,max-content);
  grid-gap: 10px;
  @media (max-width: 480px) {
    grid-template-columns: repeat(7,1fr);
  }
`;

export const Year = styled.div`
  max-width: 100vw;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }

  @media (max-width: 1000px) {
    grid-template-columns: repeat(auto-fill,minmax(315px, 1fr));
  }
`;

export const TimelineContainer = styled.div`
  counter-reset: year;
  display: grid;
  grid-template-columns: repeat(52, 1fr);
  grid-gap: 1px;
  max-width: calc(15px * 52);
  padding-right: 2em;

  @media (min-width: 480px) {
    grid-gap: 2px;
  }
`;

export const Week = styled(Box)`
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  display: ${(p) => (p.passed ? 'inline-flex' : 'inline-block')};
  width: 35px;
  height: 35px;
  ${(p) => (!p.passed ?
    css`
          background-color: ${(p) => p.inactive ? 'transparent' : 'rgba(0, 0, 0, 0.05)'};
        ` :
    '')}
  ${(p) => (p.isLoading ?
    css`
          animation: ${grayscale} 2s linear infinite;
        ` :
    '')}
`;
