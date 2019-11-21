import { colors } from '@uidu/theme';
import React from 'react';
import { CheckCircle } from 'react-feather';
import Flag, { FlagGroup } from '../src';

export default () => (
  <FlagGroup>
    <Flag
      description={
        <span>
          My favourite issue is{' '}
          <a href="https://ecosystem.atlassian.net/browse/AK-90210">AK-90210</a>
        </span>
      }
      icon={<CheckCircle color={colors.G300} />}
      id="1"
      key="1"
      title="I am a Flag"
    />
  </FlagGroup>
);
