// @flow
import styled from 'styled-components';
import { borderRadius } from '@uidu/theme';

export default styled.span`
  ${props => `
    background-color: ${props.backgroundColor};
    color: ${props.textColor};
  `};
  border-radius: ${borderRadius()}px;
  box-sizing: border-box;
  display: inline-block;
  font-size: 11px;
  font-weight: 700;
  line-height: 1;
  max-width: 100%;
  padding: 2px 0 3px 0;
  text-transform: uppercase;
  vertical-align: baseline;
`;
