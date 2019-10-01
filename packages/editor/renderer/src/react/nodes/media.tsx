import * as React from 'react';
import { PureComponent } from 'react';
import { MediaCard } from '../../ui/MediaCard';

export interface MediaProps {
  file: any;
}

export default class Media extends PureComponent<MediaProps, {}> {
  render() {
    return <MediaCard {...this.props} />;
  }
}
