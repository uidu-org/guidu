import { colors } from '@uidu/theme';
import React from 'react';
import { CheckCircle } from 'react-feather';
import Flag, { FlagGroup } from '../src';

export default () => (
  <FlagGroup>
    <Flag
      appearance="success"
      icon={<CheckCircle fill={colors.G400} />}
      id="success"
      key="success"
      title="Connected"
      description="All wires now hooked up."
      actions={[{ content: 'Alrighty then', onClick: () => {} }]}
    />
  </FlagGroup>
);
