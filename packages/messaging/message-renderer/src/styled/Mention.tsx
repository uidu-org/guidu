import styled, { css } from 'styled-components';
import { colors, themed } from '@uidu/theme';
const hoverBackgroundColor = themed({ light: colors.N20, dark: colors.DN60 });

export default styled.span`
  align-items: center;
  display: inline-flex;
  cursor: pointer;
  font-weight: inherit;
  line-height: normal;
  word-break: break-word;
  // border-width: 1px;
  // border-style: solid;
  // border-color: transparent;
  // border-image: initial;
  border-radius: 4px;
  padding: 0px 3px;
  ${props => css`
    background: ${hoverBackgroundColor};
  `}
`;
