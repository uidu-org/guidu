import Button from '@uidu/button';
import React from 'react';
import Tooltip from '../src';

export default () => (
  <Tooltip content="Hello World" hideTooltipOnClick>
    <Button>Clicking hides the tooltip</Button>
  </Tooltip>
);
