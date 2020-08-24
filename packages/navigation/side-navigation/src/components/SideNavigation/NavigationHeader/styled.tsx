import styled from 'styled-components';

export const StyledNavigationHeaderBefore = styled.div`
  align-items: center;
  display: flex;
  margin-right: 0.5rem;
  margin-left: -0.75rem;
`;

export const StyledNavigationHeaderText = styled.div`
  flex-grow: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const StyledNavigationHeaderAfter = styled.div`
  display: flex;
`;

export default styled.div.attrs(({ className }) => ({
  className: `${className ? ` ${className}` : ''}`,
}))`
  padding: 0 2.25rem;
  align-items: center;
  display: flex;
  height: 100%;
  width: 100%;
`;
