import Button from '@uidu/button';
import styled from 'styled-components';

export const Trigger = styled(Button)<{ active?: boolean; activeBg: string }>`
  font-size: 0.9rem;
  /* font-weight: 500; */
  transition: 0.085s background-color ease-in;
  /* padding: 0.375rem 0.75rem; */

  background-color: ${({ active, activeBg }) =>
    active ? activeBg : 'transparent'};

  &:hover {
    background-color: ${({ activeBg }) => activeBg};
  }
`;

export default Trigger;
