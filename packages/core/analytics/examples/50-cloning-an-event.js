// @flow

import React from 'react';
import {
  AnalyticsListener,
  withAnalyticsEvents,
  type UIAnalyticsEvent,
} from '../src';

const AtlaskitButton = withAnalyticsEvents({
  onClick: create => {
    create({ action: 'click', version: '1.2.3' }).fire('uidu');
    return create({ action: 'click' });
  },
})(({ createAnalyticsEvent, ...props }) => <button {...props} />);

type MediaProps = {
  onClick?: (Event, UIAnalyticsEvent) => void,
};

const MediaComponent = (props: MediaProps) => {
  const onClick = (e, analyticsEvent) => {
    const publicEvent = analyticsEvent.update({ action: 'submit' }).clone();
    analyticsEvent.update({ value: 'some media-related data' }).fire('media');

    if (props.onClick) {
      props.onClick(e, publicEvent);
    }
  };

  return <AtlaskitButton {...props} onClick={onClick} />;
};

type JiraProps = {
  onClick?: Event => void,
};

const JiraApp = (props: JiraProps) => {
  const onClick = (e, analyticsEvent) => {
    analyticsEvent
      .update({ action: 'issue-updated', issueId: 123 })
      .fire('jira');

    if (props.onClick) {
      props.onClick(e);
    }
  };

  return (
    <MediaComponent {...props} onClick={onClick}>
      Click me
    </MediaComponent>
  );
};

const onEvent = (event: UIAnalyticsEvent, channel: string = 'undefined') => {
  console.log(
    `Received event on ${channel.toUpperCase()} channel. Payload:`,
    event.payload,
  );
};
export default () => (
  <AnalyticsListener channel="jira" onEvent={onEvent}>
    <AnalyticsListener channel="media" onEvent={onEvent}>
      <AnalyticsListener channel="uidu" onEvent={onEvent}>
        <JiraApp />
      </AnalyticsListener>
    </AnalyticsListener>
  </AnalyticsListener>
);
