import React from 'react';
import type { Node } from 'react';
import styled from 'styled-components';
import { withTheme } from '@uidu/theme';
import { AccordionItemTitle } from 'react-accessible-accordion';
// import { Theme } from '../theme';
// import { getInnerStyles } from './utils';

export default styled(AccordionItemTitle)`
  ${'' /* background-color: #f4f4f4; */}
  align-items: center;
  display: flex;
  cursor: pointer;
  justify-content: space-between;
  padding: 1rem;
  width: 100%;
  text-align: left;
  border: none;

  &:hover {
    background-color: #f4f4f4;
  }

  * {
    margin-bottom: 0;
  }
`;
