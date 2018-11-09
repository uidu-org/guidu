import React from 'react';

import { compose } from 'recompose';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

import defaultMapOptions from 'utils/maps';

export const MapWrapper = compose(withGoogleMap)(
  ({ location, defaultZoom, children }) => (
    <GoogleMap
      defaultZoom={defaultZoom}
      defaultCenter={{ lat: location.lat, lng: location.lon }}
      defaultOptions={defaultMapOptions}
      googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
      loadingElement={<div style={{ height: '100%' }} />}
    >
      {children}
    </GoogleMap>
  ),
);

MapWrapper.defaultProps = {
  defaultZoom: 8,
};

export const MapWithAMarker = ({ location, ...otherProps }) => (
  <MapWrapper location={location} {...otherProps}>
    <Marker position={{ lat: location.lat, lng: location.lon }} />
  </MapWrapper>
);
