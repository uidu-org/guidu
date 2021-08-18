import styled from 'styled-components';

export const StyledNavigationItem = styled.div`
  /* display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center; */
  align-self: center;
  position: relative;

  &:hover,
  &.active {
    color: rgb(var(--brand-primary));
    /* color: var(--body-color); */
    transition: color linear 100ms;
  }
`;

export const StyledNavigationBefore = styled.div`
  align-items: center;
  display: flex;
  margin-right: 0.5rem;
`;

export const StyledNavigationText = styled.div<{
  $isActionOpen: boolean;
}>`
  flex-grow: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const StyledNavigationAfter = styled.div``;
