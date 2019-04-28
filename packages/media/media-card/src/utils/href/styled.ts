import styled from 'styled-components';

export const A = styled.a`
  text-decoration: none;
  outline: 0 !important;

  &:hover {
    text-decoration: none;
  }

  &.underline {
    &:hover {
      text-decoration: underline;
    }
  }
`;
