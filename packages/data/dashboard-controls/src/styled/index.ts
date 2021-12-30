import Button from '@uidu/button';
import styled from 'styled-components';

export const Trigger = styled(Button)<{ active?: boolean; activeBg: string }>`
  font-weight: 500;
  /* padding: 0.25rem 0.5rem; */

  background-color: ${({ active, activeBg }) =>
    active ? activeBg : 'transparent'};

  &:hover {
    background-color: #f1f3f3;
  }

  &:focus {
    box-shadow: none;
    outline: none;
  }
`;
