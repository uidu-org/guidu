import styled, { css } from 'styled-components';

export const StyledNavigationActions = styled.div`
  display: flex;
  align-items: center;
`;

export const StyledNavigationAction = styled.button<{ isCollapsed?: boolean }>`
  border-radius: 0.25rem;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
  ${({ isCollapsed }) =>
    isCollapsed
      ? css`
          padding-top: 0.15rem;
          padding-bottom: 0.15rem;
        `
      : ''}
`;
