// @flow
import React from 'react';
import Accordion from '../src';

import { defaultAccordionItems } from '../examples-utils';

export default () => (
  <Accordion accordion={false} items={defaultAccordionItems} />
);
