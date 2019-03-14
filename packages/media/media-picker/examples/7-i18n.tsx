import {
  I18NWrapper,
  defaultCollectionName,
  defaultMediaPickerAuthProvider,
  userAuthProvider,
} from '@uidu/media-test-helpers';
import * as React from 'react';
import { Component } from 'react';
import { ContextFactory } from '@uidu/media-core';
import { MediaPicker, Popup } from '../src';
import { intlShape } from 'react-intl';

const mediaContext = ContextFactory.create({
  authProvider: defaultMediaPickerAuthProvider,
  userAuthProvider,
});

interface ExampleChildrenProps {}

// This class simulates a real integration where the React legacy context it's passed manually.
// That's pretty much what Editor does.
class ExampleChildren extends Component<ExampleChildrenProps, {}> {
  popup?: Popup;

  static contextTypes = {
    intl: intlShape,
  };

  async componentDidMount() {
    await this.createMediaPicker(this.context);
    this.showMediaPicker();
  }

  async componentWillReceiveProps(_: ExampleChildrenProps, nextContext: any) {
    if (this.context.intl !== nextContext.intl) {
      await this.createMediaPicker(nextContext);
    }
  }

  async createMediaPicker(reactContext: any) {
    this.popup = await MediaPicker('popup', mediaContext, {
      container: document.body,
      uploadParams: {
        collection: defaultCollectionName,
      },
      proxyReactContext: reactContext,
    });
  }

  showMediaPicker = () => {
    if (this.popup) {
      this.popup.show();
    }
  };

  render() {
    return <button onClick={this.showMediaPicker}>Show Popup</button>;
  }
}

export default class Example extends Component<{}, {}> {
  render() {
    return (
      <div>
        <I18NWrapper>
          <ExampleChildren />
        </I18NWrapper>
      </div>
    );
  }
}
