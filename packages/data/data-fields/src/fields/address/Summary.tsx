import Map, { bindResizeListener, getMapBounds, Marker } from '@uidu/map';
import React from 'react';

const apiIsLoaded = (map, maps, places) => {
  // Get bounds by our places
  const bounds = getMapBounds(map, maps, places);
  // Fit map to bounds
  map.fitBounds(bounds);
  // Bind the resize listener
  bindResizeListener(map, maps, bounds);
};

export default function Summary({ values = [] }) {
  if (values.length === 0) {
    return null;
  }

  return (
    <div style={{ height: '400px', width: '100%' }}>
      <Map
        location={{ lat: values[0].latitude, lng: values[0].longitude }}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => apiIsLoaded(map, maps, values)}
      >
        {values.map((value, index) => (
          <Marker
            key={`marker-${index}`}
            lat={value.latitude}
            lng={value.longitude}
          >
            {/* <div>{value.address}</div> */}
          </Marker>
        ))}
      </Map>
    </div>
  );
}
