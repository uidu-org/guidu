import { lighten } from 'polished';
import styled from 'styled-components';

export const StyledNavigationLink = styled.a.attrs(({ className }) => ({
  className: `nav-link${className ? ` ${className}` : ''}`,
}))`
  align-items: center;
  cursor: pointer;
  display: flex;
  border-radius: 0.25rem;
  color: ${`${lighten(0.2, '#4c566a')} !important`};
  transition: background-color linear 300ms;
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  padding-left: 1.75rem;
  font-size: 0.925rem;

  &:hover,
  &.active {
    background-color: rgba(76, 86, 106, 0.085);
    color: #4c566a;
    transition: background-color linear 300ms;
  }
`;
