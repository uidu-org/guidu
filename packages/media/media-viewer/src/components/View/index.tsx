import loadable from '@loadable/component';
import React, { PureComponent } from 'react';

const LoadableImage = loadable(() => import('./Image'));
const LoadableVideo = loadable(() => import('./Video'));
// const LoadableFile = loadable(() => import('./File'));

export default class View extends PureComponent<any> {
  render() {
    const { data } = this.props;
    console.log(data);
    switch (data.type) {
      case 'image':
        return <LoadableImage {...this.props} />;
      case 'video':
        return <LoadableVideo {...this.props} />;
      // case 'file':
      //   return <LoadableFile {...this.props} />;
      default:
        return null;
    }
  }
}
