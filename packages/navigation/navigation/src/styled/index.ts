import styled from 'styled-components';

export const StyledNavigationItem = styled.li.attrs(({ className }) => ({
  className: `nav-item${className ? ` ${className}` : ''}`,
}))`
  width: 100%;
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
