import styled from 'styled-components';

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

export const Week = styled.div`
  position: relative;
  display: block;

  &::before {
    content: '';
    display: block;
    width: 100%;
    padding-bottom: 100%;
    background: ${p =>
      p.passed ? p.theme.timelinePassed : 'rgba(0, 0, 0, 0.05)'};
  }

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
