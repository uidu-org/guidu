import * as React from 'react';
import {
  AnalyticsListener,
  UIAnalyticsEventHandler,
} from '@uidu/analytics';
import { ListenerProps, FabricChannel } from '../types';

import { handleEvent } from './handle-event';

export const EDITOR_TAG = 'fabricEditor';

export default class FabricEditorListener extends React.Component<
  ListenerProps
> {
  handleEventWrapper: UIAnalyticsEventHandler = event => {
    handleEvent(event, EDITOR_TAG, this.props.logger, this.props.client);
  };

  render() {
    return (
      <AnalyticsListener
        onEvent={this.handleEventWrapper}
        channel={FabricChannel.editor}
      >
        {this.props.children}
      </AnalyticsListener>
    );
  }
}
