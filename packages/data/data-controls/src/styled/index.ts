import styled from 'styled-components';

export const Trigger = styled.button<{ active?: boolean; activeBg: string }>`
  font-size: 0.8rem;
  font-weight: 500;
  transition: 0.085s background-color ease-in;
  padding: 0.375rem 0.75rem;
  display: flex;
  align-items: center;

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
