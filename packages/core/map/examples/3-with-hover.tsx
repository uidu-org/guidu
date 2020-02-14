import React, { useState } from 'react';
import Map, { bindResizeListener, getMapBounds, Marker } from '..';
import {
  defaultMapProps,
  generateMarkers,
  susolvkaCoords,
} from '../examples-utils';

const apiIsLoaded = (map, maps, places) => {
  // Get bounds by our places
  const bounds = getMapBounds(map, maps, places);
  // Fit map to bounds
  map.fitBounds(bounds);
  // Bind the resize listener
  bindResizeListener(map, maps, bounds);
};

const markers = generateMarkers(25);

export default function WithHover() {
  const [highlightedId, setHighlightedId] = useState(null);

  return (
    <div className="row no-gutters" style={{ height: '400px', width: '100%' }}>
      <div className="col-4 overflow-auto h-100">
        <ul className="list-group">
          {markers.map(marker => (
            <li
              className="list-group-item list-group-item-action"
              key={marker.id}
              onMouseEnter={e => setHighlightedId(marker.id)}
              onMouseLeave={e => setHighlightedId(null)}
            >
              {marker.id}
            </li>
          ))}
        </ul>
      </div>
      <div className="col-8">
        <Map
          {...defaultMapProps}
          location={susolvkaCoords}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => {
            apiIsLoaded(map, maps, markers);
          }}
        >
          {markers.map((marker, index) => (
            <Marker {...marker} isHover={marker.id === highlightedId} />
          ))}
        </Map>
      </div>
    </div>
  );
}
