import React from 'react';
import type { Node } from 'react';
import styled from 'styled-components';
import { withTheme } from '@uidu/theme';
import { AccordionItemPanel } from 'react-accessible-accordion';
// import { Theme } from '../theme';
// import { getInnerStyles } from './utils';

export default styled(AccordionItemPanel)`
  padding: 1rem;
  display: block;
  animation: fadein 0.35s ease-in;

  &.accordion__body--hidden {
    display: none;
    opacity: 0;
    animation: fadein 0.35s ease-in;
  }

  & > *:last-child {
    margin-bottom: 0;
  }
`;
