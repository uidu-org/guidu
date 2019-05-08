import styled from 'styled-components';

export const StyledNavigationHeaderBefore = styled.div`
  align-items: center;
  display: flex;
  margin-right: 0.5rem;
  margin-left: -0.5rem;
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
  className: `px-3 px-xl-4 ml-2 ml-md-3${className ? ` ${className}` : ''}`,
}))`
  align-items: center;
  display: flex;
  height: 100%;
  width: 100%;
`;
