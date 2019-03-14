import * as React from 'react';

import { colors } from '@atlaskit/theme';
import { ModalSpinner } from '@uidu/media-ui';
import { MediaViewer } from './media-viewer';
import { MediaViewerProps } from './types';

interface AsyncMediaViewerState {
  MediaViewer?: typeof MediaViewer;
}

export default class AsyncMediaViewer extends React.PureComponent<
  MediaViewerProps & AsyncMediaViewerState,
  AsyncMediaViewerState
> {
  static displayName = 'AsyncMediaViewer';
  static MediaViewer?: typeof MediaViewer;

  state = {
    // Set state value to equal to current static value of this class.
    MediaViewer: AsyncMediaViewer.MediaViewer,
  };

  async componentWillMount() {
    if (!this.state.MediaViewer) {
      const module = await import(/* webpackChunkName:"@atlaskit-internal_media-viewer" */
      './media-viewer');
      AsyncMediaViewer.MediaViewer = module.MediaViewer;
      this.setState({ MediaViewer: module.MediaViewer });
    }
  }

  render() {
    if (!this.state.MediaViewer) {
      return (
        <ModalSpinner blankedColor={colors.DN30} invertSpinnerColor={true} />
      );
    }

    return <this.state.MediaViewer {...this.props} />;
  }
}
