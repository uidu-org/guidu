import { colors } from '@uidu/theme';
import React from 'react';
import { CheckCircle } from 'react-feather';
import Flag, { FlagGroup } from '../src';

export default () => (
  <div>
    <FlagGroup>
      <Flag
        description="I should be above the modal dialog"
        icon={<CheckCircle fill={colors.G300} />}
        id="1"
        key="1"
        title="I am a Flag"
      />
    </FlagGroup>
  </div>
);
