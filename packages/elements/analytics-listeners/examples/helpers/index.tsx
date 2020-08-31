import {
  AnalyticsEventPayload,
  createAndFireEvent,
  withAnalyticsContext,
  withAnalyticsEvents,
  WithAnalyticsEventsProps,
} from '@uidu/analytics';
import {
  EventType,
  GasPurePayload,
  GasPureScreenEventPayload,
} from '@uidu/analytics-gas-types';
import Button from '@uidu/button';
import * as React from 'react';
import { FabricChannel } from '../../src/types';

export type OwnProps = {
  onClick: (e: React.SyntheticEvent) => void;
};

export type Props = WithAnalyticsEventsProps & OwnProps;

const CustomButton = ({
  onClick,
  text,
}: {
  onClick: React.MouseEventHandler<HTMLDivElement>;
  text?: string;
}) => (
  <div id="dummy" onClick={onClick} style={{ paddingBottom: 12 }}>
    <Button>{text || 'Test'}</Button>
  </div>
);

export class DummyElementsComponent extends React.Component<Props> {
  static displayName = 'DummyElementsComponent';

  render() {
    return (
      <CustomButton
        text={FabricChannel.elements}
        onClick={this.props.onClick}
      />
    );
  }
}

export class DummyGuiduComponent extends React.Component<Props> {
  static displayName = 'DummyGuiduComponent';
  render() {
    return (
      <CustomButton text={FabricChannel.uidu} onClick={this.props.onClick} />
    );
  }
}

export class DummyNavigationComponent extends React.Component<Props> {
  static displayName = 'DummyNavigationComponent';
  render() {
    return (
      <CustomButton
        text={FabricChannel.navigation}
        onClick={this.props.onClick}
      />
    );
  }
}

export class DummyEditorComponent extends React.Component<Props> {
  static displayName = 'DummyEditorComponent';
  render() {
    return (
      <CustomButton text={FabricChannel.editor} onClick={this.props.onClick} />
    );
  }
}

export class DummyMediaComponent extends React.Component<Props> {
  static displayName = 'DummyEditorComponent';
  render() {
    return (
      <CustomButton text={FabricChannel.media} onClick={this.props.onClick} />
    );
  }
}

class MyButton extends React.Component<Props> {
  static displayName = 'MyButton';
  render() {
    return (
      <button id="dummy" onClick={this.props.onClick}>
        Test [click on me]
      </button>
    );
  }
}

const componentChannels = {
  [FabricChannel.guidu]: DummyGuiduComponent,
  [FabricChannel.elements]: DummyElementsComponent,
  [FabricChannel.navigation]: DummyNavigationComponent,
  [FabricChannel.editor]: DummyEditorComponent,
  [FabricChannel.media]: DummyMediaComponent,
};

export const createComponentWithAnalytics = (channel: FabricChannel) =>
  withAnalyticsEvents({
    onClick: createAndFireEvent(channel)({
      action: 'someAction',
      actionSubject: 'someComponent',
      eventType: 'ui',
    }),
  })(componentChannels[channel]);

export const createComponentWithAttributesWithAnalytics = (
  channel: FabricChannel,
) =>
  withAnalyticsEvents({
    onClick: createAndFireEvent(channel)({
      action: 'someAction',
      actionSubject: 'someComponent',
      eventType: 'ui',
      attributes: {
        packageName: '@uidu/foo',
        packageVersion: '1.0.0',
        componentName: 'foo',
        fooBar: 'yay',
      },
    }),
  })(componentChannels[channel]);

export const createTaggedComponentWithAnalytics = (
  channel: FabricChannel,
  tag: string,
) =>
  withAnalyticsEvents({
    onClick: createAndFireEvent(channel)({
      action: 'someAction',
      actionSubject: 'someComponent',
      eventType: 'ui',
      tags: [tag, 'foo'],
    }),
  })(componentChannels[channel]);

export const IncorrectEventType = (channel: FabricChannel) =>
  withAnalyticsEvents({
    onClick: createAndFireEvent(channel)({
      action: 'someAction',
      actionSubject: 'someComponent',
      eventType: 'unknown' as EventType,
    }),
  })(componentChannels[channel]);

export const createButtonWithAnalytics = (
  payload: GasPurePayload,
  channel: FabricChannel,
  context: AnalyticsEventPayload[] = [], // Context should incluide all data in the same order that AnalyticsListener would receive it
): typeof MyButton => {
  const ButtonWithAnalyticsEvents = withAnalyticsEvents({
    onClick: createAndFireEvent(channel)(payload),
  })(MyButton);

  const reversedContext = [...context].reverse();
  return reversedContext.reduce(
    (ButtonWithAnalyticsContext, contextData: AnalyticsEventPayload) =>
      withAnalyticsContext(contextData)(
        ButtonWithAnalyticsContext as React.FunctionComponent,
      ),
    ButtonWithAnalyticsEvents,
  ) as typeof MyButton;
};

export const createAnalyticsWebClientMock = () => ({
  sendUIEvent: (event: GasPurePayload) => {
    console.log('sendUIEvent: ', event);
  },
  sendOperationalEvent: (event: GasPurePayload) => {
    console.log('sendOperationalEvent: ', event);
  },
  sendTrackEvent: (event: GasPurePayload) => {
    console.log('sendTrackEvent: ', event);
  },
  sendScreenEvent: (event: GasPureScreenEventPayload) => {
    console.log('sendScreenEvent: ', event);
  },
});
