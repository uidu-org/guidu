import { MediaSingleDimensionHelper } from '@uidu/editor-common';
import styled from 'styled-components';

export const Wrapper = styled.div`
  & > div {
    ${MediaSingleDimensionHelper};
    position: relative;

    > div {
      position: absolute;
      height: 100%;
    }
  }

  & > div::after {
    content: '';
    display: block;
    padding-bottom: ${p => (p.height / p.width) * 100}%;

    /* Fixes extra padding problem in Firefox */
    font-size: 0;
    line-height: 0;
  }
`;
