import styled from 'styled-components';

const COLOR_MAP = {
  ermakoy: '#350350',
  mark: '#911911',
};

export const PersonDrink = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${p => COLOR_MAP[p.name.toLowerCase()]};
`;
