import React from 'react';
import { MarkerClusterer } from 'react-google-maps/lib/components/addons/MarkerClusterer';
import Marker from './Marker';

export default props => (
  <MarkerClusterer
    onClick={props.onMarkerClustererClick}
    averageCenter
    defaultAverageCenter
    enableRetinaIcons
    gridSize={60}
  >
    {props.markers.map(marker => (
      <Marker key={marker.id} location={marker.location} />
    ))}
  </MarkerClusterer>
);
