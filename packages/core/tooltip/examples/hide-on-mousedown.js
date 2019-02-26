// @flow
import React, { Fragment } from 'react';
import Button from '@uidu/button';

import Tooltip from '../src';

export default () => (
  <Tooltip content="Hello World" hideTooltipOnMouseDown>
    <Fragment>
      <Button>Mousedown event hides the tooltip</Button>
      <p>
        Tooltip will hides when mouse down event is triggered (when you start
        clicking). It avoids the tooltip to be displayed when content is removed
      </p>
    </Fragment>
  </Tooltip>
);
