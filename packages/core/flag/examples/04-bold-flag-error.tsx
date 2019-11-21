import { colors } from '@uidu/theme';
import React from 'react';
import { AlertCircle } from 'react-feather';
import Flag, { FlagGroup } from '../src';

export default () => (
  <FlagGroup>
    <Flag
      appearance="error"
      icon={<AlertCircle fill={colors.R400} />}
      id="error"
      key="error"
      title="We couldn't connect"
      description="Sorry about that. Try checking your internet connection or check the status on our end."
      actions={[{ content: 'Check StatusPage', onClick: () => {} }]}
    />
  </FlagGroup>
);
