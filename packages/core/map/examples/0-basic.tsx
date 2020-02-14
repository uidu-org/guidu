import React from 'react';
import Map from '..';
import { londonCoords } from '../examples-utils';

export default () => (
  <div style={{ height: '400px', width: '100%' }}>
    <Map location={londonCoords} />
  </div>
);
