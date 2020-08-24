import styled, { css } from 'styled-components';

export const StyledNavigationActions = styled.div`
  display: flex;
  align-items: center;
`;

export const StyledNavigationAction = styled.button<{ isCollapsed?: boolean }>`
  transition: background-color ease-in 300ms;
  border-radius: 0.25rem;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
    transition: background-color ease-in 300ms;
  }
  ${({ isCollapsed }) =>
    isCollapsed
      ? css`
          padding-top: 0.15rem;
          padding-bottom: 0.15rem;
        `
      : ''}
`;
