// @flow

import React, { Component } from 'react';

import { compose, withProps } from 'recompose';
import { withScriptjs, withGoogleMap, GoogleMap } from 'react-google-maps';

import defaultMapOptions from './utils';

type LocationProps = {
  lat: float,
  lon: float,
};

type Props = {
  /** The appearance type. */
  location: LocationProps,

  /** Elements to be rendered inside the lozenge. This should ideally be just a word or two. */
  children?: Node,
};

class Map extends Component<Props> {
  static defaultProps = {
    defaultZoom: 8,
  };

  render() {
    const { defaultZoom, location, children } = this.props;
    return (
      <GoogleMap
        defaultZoom={defaultZoom}
        defaultCenter={{ lat: location.lat, lng: location.lon }}
        defaultOptions={defaultMapOptions}
      >
        {children}
      </GoogleMap>
    );
  }
}

export default compose(
  withProps({
    googleMapURL:
      'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyB5Ad3PbiQ_V5311qqttzekf_J8VqfAMYc',
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap,
)(props => <Map {...props} />);
