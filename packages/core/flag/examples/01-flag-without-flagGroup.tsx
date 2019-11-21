import { colors } from '@uidu/theme';
import React from 'react';
import { CheckCircle } from 'react-feather';
import Flag from '../src';

export default () => (
  <Flag
    actions={[
      { content: 'Show me', onClick: () => {} },
      { content: 'No thanks', onClick: () => {} },
    ]}
    icon={<CheckCircle color={colors.G300} />}
    description="We got fun an games. We got everything you want honey, we know the names."
    id="1"
    key="1"
    title="Welcome to the jungle"
  />
);
