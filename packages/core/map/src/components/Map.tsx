import GoogleMapReact, { Props } from 'google-map-react';
import React, { Component } from 'react';
import { mapOptions } from '../utils';

type LocationProps = {
  lat: number;
  lng: number;
};

type MapProps = {
  bootstrapURLKeys?: object;
  location: LocationProps;
} & Props;

export default class Map extends Component<MapProps> {
  static defaultProps = {
    defaultZoom: 8,
  };

  render() {
    const { defaultZoom, location, children, ...otherProps } = this.props;
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
}
