import React from 'react';
import {
  defaultMapProps,
  generateMarkers,
  susolvkaCoords,
} from '../examples-utils';
import Map, { bindResizeListener, getMapBounds, Marker } from '../src';

const apiIsLoaded = (map, maps, places) => {
  // Get bounds by our places
  const bounds = getMapBounds(map, maps, places);
  // Fit map to bounds
  map.fitBounds(bounds);
  // Bind the resize listener
  bindResizeListener(map, maps, bounds);
};

const markers = generateMarkers(25);

export default () => (
  <div style={{ height: '400px', width: '100%' }}>
    <Map
      {...defaultMapProps}
      location={susolvkaCoords}
      yesIWantToUseGoogleMapApiInternals
      onGoogleApiLoaded={({ map, maps }) => apiIsLoaded(map, maps, markers)}
      onChildMouseEnter={console.log}
      onChildMouseLeave={console.log}
    >
      {markers.map((marker) => (
        <Marker {...marker} />
      ))}
    </Map>
  </div>
);
