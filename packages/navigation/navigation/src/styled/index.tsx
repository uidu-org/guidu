import styled from 'styled-components';
import { NavLink as Link } from 'react-router-dom';

export const NavigationHeader = styled.li.attrs(({ className }) => ({
  className: `nav-link${className ? ` ${className}` : ''}`,
}))`
  color: #bfc3c6;
  font-size: 80%;
  letter-spacing: 0.1rem;
  text-transform: uppercase;
`;

export const NavigationItem = styled.li.attrs(({ className }) => ({
  className: `nav-item${className ? ` ${className}` : ''}`,
}))``;

export const NavigationLink = styled.a.attrs(({ className }) => ({
  className: `nav-link${className ? ` ${className}` : ''}`,
}))`
  align-items: center;
  cursor: pointer;
  display: flex;
  border-radius: 40px;
  justify-content: space-between;
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

export const FakeGlobalItemWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const FakeItemWrapper = styled.div<any>`
  align-items: center;
  display: flex;
  flex-shrink: 0;
  position: relative;
  color: #f8f9fa;

  &:focus {
    outline: none;
  }

  &:hover {
    text-decoration: none;
    color: #f8f9fa;

    &:after {
      content: '';
      background: rgba(9, 30, 66, 0.42);
      /* width: 100%; */
      position: absolute;
      height: 92%;
      left: 12px;
      right: 1rem;
      border-radius: 40px;
      z-index: -1;
    }
  }
`;
