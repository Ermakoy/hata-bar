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
         display: inline-block;
         width: 20px;
         height: 20px;
         padding-right: 5px;
         &::before {
           content: '';
           display: block;
           width: 100%;
           padding-bottom: 100%;
           background: ${p =>
             p.passed ? p.theme.timelinePassed : 'rgba(0, 0, 0, 0.05)'};
         }

         ${p =>
           p.passed
             ? css`
                 &:hover {
                   &::before {
                     animation: ${rainbow} 2s linear infinite;
                   }
                 }
               `
             : ''}

         &::after {
           position: absolute;
           left: calc(100% + 4px);
           top: 50%;
           -webkit-transform: translateY(-50%);
           transform: translateY(-50%);
           font-size: 12px;
           line-height: 1;
         }

         &:nth-child(52)::after {
           content: 'Год';
         }

         &:nth-child(52n) {
           counter-increment: year;
         }

         @media (max-width: 479px) {
           &:nth-child(520n)::after {
             content: counter(year);
           }
         }

         @media (min-width: 480px) and (max-width: 767px) {
           &:nth-child(260n)::after {
             content: counter(year);
           }
         }

         @media (min-width: 768px) {
           &:nth-child(208n)::after {
             content: counter(year);
           }
         }
       `;
