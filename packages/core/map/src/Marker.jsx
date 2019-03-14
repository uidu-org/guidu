import React from 'react';
import { Marker } from 'react-google-maps';

export default ({ location }) => (
  <Marker position={{ lat: location.lat, lng: location.lon }} />
);
