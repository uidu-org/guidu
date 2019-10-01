import React from 'react';
import Map from '..';
import { defaultMapProps } from '../examples-utils';

export default () => (
  <div style={{ height: '400px', width: '100%' }}>
    <Map {...defaultMapProps} />
  </div>
);
