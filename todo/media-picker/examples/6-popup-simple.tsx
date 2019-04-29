import {
  defaultCollectionName,
  defaultMediaPickerAuthProvider,
  userAuthProvider,
  mediaMock,
} from '@uidu/media-test-helpers';
import * as React from 'react';
import { Component } from 'react';
import Button from '@uidu/button';
import { ContextFactory } from '@uidu/media-core';

import { MediaPicker } from '../src';
import { Popup } from '../index';

mediaMock.enable();

const context = ContextFactory.create({
  authProvider: defaultMediaPickerAuthProvider,
  userAuthProvider,
});

export type Event = {
  readonly name: string;
  readonly payload: any;
};

export type Props = {};

export type State = {
  readonly events: Event[];
  readonly popup?: Popup;
};

export default class Example extends Component<Props, State> {
  state: State = {
    events: [],
  };

  async componentDidMount() {
    const popup = await MediaPicker('popup', context, {
      uploadParams: {
        collection: defaultCollectionName,
      },
    });

    popup.show();

    popup.onAny((event, payload) => {
      const { events } = this.state;
      this.setState({
        events: [...events, { name: event, payload }],
      });
    });

    this.setState({ popup });
  }

  render() {
    const { events, popup } = this.state;
    return (
      <div>
        <Button id="show" onClick={() => (popup ? popup.show() : null)}>
          Show
        </Button>
        <div>
          <div>Events:</div>
          <pre id="events">{JSON.stringify(events, null, 2)}</pre>
        </div>
      </div>
    );
  }
}
