import { borderRadius } from '@atlaskit/theme';
import styled from 'styled-components';
import { Wrapper as WrapperDefault } from '../styles';

export const Wrapper = styled(WrapperDefault)`
  cursor: pointer;
  display: inline-flex;
  margin: 1px;

  > img {
    border-radius: ${borderRadius()}px;
  }

  &::after,
  &::before {
    vertical-align: text-top;
    display: inline-block;
    width: 1px;
    content: '';
  }

  &.with-children {
    padding: 0;
    background: white;
  }
`;
