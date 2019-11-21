import { colors } from '@uidu/theme';
import React from 'react';
import { AlertTriangle } from 'react-feather';
import Flag, { FlagGroup } from '../src';

export default () => (
  <FlagGroup>
    <Flag
      appearance="warning"
      icon={<AlertTriangle fill={colors.Y200} />}
      id="warning"
      key="warning"
      title="Presence isn't working"
      description="We'll do our best to get it up and running again soon."
      actions={[
        { content: 'Try again', onClick: () => {} },
        { content: 'Check StatusPage', onClick: () => {} },
      ]}
    />
  </FlagGroup>
);
