import styled from 'styled-components';

export const TriggerWrapper = styled.span`
  display: flex;
  align-items: center;

  > div,
  > span {
    display: flex;
  }

  > div > div {
    display: flex;
  }
`;
