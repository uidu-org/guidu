// @flow

import React from 'react';
import { colors } from '@atlaskit/theme';
import Spinner from '../src';

export default () => (
  <div
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      backgroundColor: colors.B400,
      padding: '10px',
    }}
  >
    <Spinner invertColor size="small" />
    <Spinner invertColor size="medium" />
    <Spinner invertColor size="large" />
    <Spinner invertColor size="xlarge" />
  </div>
);
