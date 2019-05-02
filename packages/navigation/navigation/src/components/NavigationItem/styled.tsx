import styled from 'styled-components';

export const StyledNavigationItem = styled.li.attrs(({ className }) => ({
  className: `nav-item${className ? ` ${className}` : ''}`,
}))`
  width: 100%;
`;

export const StyledNavigationLink = styled.a.attrs(({ className }) => ({
  className: `nav-link${className ? ` ${className}` : ''}`,
}))`
  align-items: center;
  cursor: pointer;
  display: flex;
  border-radius: 0.25rem;
  color: #4c566a !important;
  transition: background-color linear 300ms;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;

  &:hover,
  &.active {
    background-color: #f3f3f3;
    color: #4c566a;
    transition: background-color linear 300ms;
  }
`;

export const StyledNavigationBefore = styled.div`
  align-items: center;
  display: flex;
  margin-right: 0.5rem;
`;

export const StyledNavigationText = styled.div`
  flex-grow: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const StyledNavigationAfter = styled.div``;
