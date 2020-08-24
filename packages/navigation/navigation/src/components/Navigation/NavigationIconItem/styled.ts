import styled from 'styled-components';

export const StyledNavigationIconItem = styled.div`
  align-items: center;
  display: flex;
  margin: 0.25rem;
  width: auto;
  flex-shrink: 0;
`;

export const StyledNavigationIconItemIcon = styled.div`
  align-self: center;
  display: inline-flex;
  flex-wrap: nowrap;
  max-width: 100%;
  position: relative;
`;

export const StyledNavigationIconLink = styled.a`
  align-items: center;
  display: flex;
  max-width: 100%;
  text-align: center;
  justify-content: center;
  color: rgb(52, 69, 99);
  cursor: default;
  vertical-align: middle;
  text-decoration: none;
  background: transparent;
  border-radius: 100%;
  padding: 4px;
  transition: background 0.1s ease-out 0s,
    box-shadow 0.15s cubic-bezier(0.47, 0.03, 0.49, 1.38) 0s;
  margin: 0px 2px;
  outline: none !important;

  width: 2rem;
  height: 2rem;

  &:hover {
    color: rgb(0, 82, 204);
    background-color: rgba(222, 235, 255, 0.9);
  }
`;
