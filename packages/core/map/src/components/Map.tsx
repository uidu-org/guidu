import GoogleMapReact, { Props } from 'google-map-react';
import React, { ReactNode } from 'react';
import { mapOptions } from '../utils';

type LocationProps = {
  lat: number;
  lng: number;
};

type MapProps = {
  bootstrapURLKeys?: object;
  location: LocationProps;
  children: ReactNode;
} & Props;

export default function Map({
  defaultZoom = 8,
  location,
  children,
  ...otherProps
}: MapProps) {
  return (
    <GoogleMapReact
      defaultZoom={defaultZoom}
      defaultCenter={{ lat: location.lat, lng: location.lng }}
      options={mapOptions}
      {...otherProps}
    >
      {children}
    </GoogleMapReact>
  );
}
