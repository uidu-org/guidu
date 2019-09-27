import styled from 'styled-components';
import { ThemeTokens } from '../theme';

const Container = styled.span<{
  backgroundColor: string;
  textColor: string;
}>`
  ${(props: ThemeTokens) => `
    background-color: ${props.backgroundColor};
    color: ${props.textColor};
  `};
  border-radius: 2em;
  display: inline-block;
  font-size: 0.8rem;
  font-weight: normal;
  line-height: 1;
  min-width: 1px;
  padding: 0.2rem 0.5rem;
  text-align: center;
`;

export default Container;
