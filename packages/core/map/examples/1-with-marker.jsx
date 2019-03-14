// @flow
import React from 'react';
import Map, { Marker } from '../src';
import { defaultMapProps, defaultMarkerProps } from '../examples-utils';

export default () => (
  <Map {...defaultMapProps}>
    <Marker {...defaultMarkerProps} />
  </Map>
);
