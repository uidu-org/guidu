import React from 'react';
import Map, { Marker } from '..';
import { defaultMapProps, defaultMarkerProps } from '../examples-utils';

export default () => (
  <div style={{ height: '400px', width: '100%' }}>
    <Map {...defaultMapProps}>
      <Marker {...defaultMarkerProps} />
    </Map>
  </div>
);
