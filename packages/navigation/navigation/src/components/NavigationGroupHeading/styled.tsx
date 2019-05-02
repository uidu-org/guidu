import styled from 'styled-components';

export const StyledNavigationGroupHeadingBefore = styled.div`
  align-items: center;
  display: flex;
  margin-right: 0.5rem;
`;

export const StyledNavigationGroupHeadingText = styled.div`
  flex-grow: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const StyledNavigationGroupHeadingAfter = styled.div`
  display: flex;
`;

export default styled.li.attrs(({ className }) => ({
  className: `nav-link${className ? ` ${className}` : ''}`,
}))`
  align-items: center;
  display: flex;
  color: #bfc3c6;
  font-size: 80%;
  letter-spacing: 0.1rem;
  text-transform: uppercase;
`;
