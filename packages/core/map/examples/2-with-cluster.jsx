import React, { PureComponent } from 'react';
import Map, { MarkerCluster } from '../src';
import { defaultMapProps } from '../examples-utils';

export default class DemoApp extends PureComponent {
  UNSAFE_componentWillMount() {
    this.setState({ markers: [] });
  }

  componentDidMount() {
    const url = [
      // Length issue
      `https://gist.githubusercontent.com`,
      `/farrrr/dfda7dd7fccfec5474d3`,
      `/raw/758852bbc1979f6c4522ab4e92d1c92cba8fb0dc/data.json`,
    ].join('');

    fetch(url)
      .then(res => res.json())
      .then(data => {
        this.setState({
          markers: data.photos.map(p => ({
            id: p.photo_id,
            location: {
              lat: p.latitude,
              lon: p.longitude,
            },
          })),
        });
      });
  }

  render() {
    return (
      <Map {...defaultMapProps}>
        <MarkerCluster markers={this.state.markers} />
      </Map>
    );
  }
}
