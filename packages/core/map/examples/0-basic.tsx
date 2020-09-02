import React from 'react';
import { londonCoords } from '../examples-utils';
import Map from '../src';

export default () => (
  <div style={{ height: '400px', width: '100%' }}>
    <Map location={londonCoords} />
  </div>
);
