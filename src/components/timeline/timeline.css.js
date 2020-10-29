import styled, { keyframes, css } from 'styled-components';
import { Box } from 'rendition';
const rainbow = keyframes`
  100%,0%{
			background-color: ${p =>
        p.passed ? p.theme.timelinePassed : 'rgba(0, 0, 0, 0.05)'};
  }
  8%{
    background-color: rgb(255,127,0);
  }
  16%{
    background-color: rgb(255,255,0);
  }
  25%{
    background-color: rgb(127,255,0);
  }
  33%{
    background-color: rgb(0,255,0);
  }
  41%{
    background-color: rgb(0,255,127);
  }
  50%{
    background-color: rgb(0,255,255);
  }
  58%{
    background-color: rgb(0,127,255);
  }
  66%{
    background-color: rgb(0,0,255);
  }
  75%{
    background-color: rgb(127,0,255);
  }
  83%{
    background-color: rgb(255,0,255);
  }
  91%{
    background-color: rgb(255,0,127);
  }
`;

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
  display: ${p => (p.passed ? 'inline-flex' : 'inline-block')};
  width: 20px;
  height: 20px;
  margin-right: 5px;
  ${p =>
    !p.passed
      ? css`
          background-color: ${p =>
            p.passed ? p.theme.timelinePassed : 'rgba(0, 0, 0, 0.05)'};
        `
      : ''}
  ${p =>
    p.isLoading
      ? css`
          animation: ${grayscale} 2s linear infinite;
        `
      : ''}
`;
