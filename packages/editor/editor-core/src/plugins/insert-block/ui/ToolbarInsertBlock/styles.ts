import styled from 'styled-components';

export const TriggerWrapper = styled.span`
  width: 42px;

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
