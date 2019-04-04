// @flow
import React from 'react';
import Accordion from '../src';

import { defaultAccordionItems } from '../examples-utils';

export default () => (
  <Accordion allowMultipleExpanded={false} items={defaultAccordionItems} />
);
