import React from 'react';
import { defaultAccordionItems } from '../examples-utils';
import Accordion from '../src';

export default () => (
  <Accordion preExpanded={['second']} reverse items={defaultAccordionItems} />
);
