import styled from 'styled-components';

export const StyledNavigationItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  position: relative;
`;

export const StyledNavigationBefore = styled.div`
  align-items: center;
  display: flex;
  margin-right: 0.5rem;
`;

export const StyledNavigationText = styled.div<{
  isActionOpen: boolean;
  actionsCount: number;
}>`
  flex-grow: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-right: ${({ isActionOpen, actionsCount }) =>
    isActionOpen ? `${actionsCount * 2}rem` : 0};
`;

export const StyledNavigationAfter = styled.div``;
