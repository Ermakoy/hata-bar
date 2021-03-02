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
  @media (min-width: 480px) {
    grid-gap: 2px;
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
  margin-right: 10px;
  ${(p) => (!p.passed ?
      css`
          background-color: ${(p) => p.passed ? p.theme.timelinePassed : 'rgba(0, 0, 0, 0.05)'};
        ` :
      '')}
  ${(p) => (p.isLoading ?
      css`
          animation: ${grayscale} 2s linear infinite;
        ` :
      '')}
`;
