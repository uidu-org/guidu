// @flow

import React, {
  Component,
  type Node,
  type ComponentType,
  type ElementConfig,
} from 'react';
import PropTypes from 'prop-types';

import UIAnalyticsEvent from './UIAnalyticsEvent';
import type { AnalyticsEventPayload } from './types';

export type CreateUIAnalyticsEvent = (
  payload: AnalyticsEventPayload,
) => UIAnalyticsEvent;

export type WithAnalyticsEventsProps = {|
  /**
    You should not be accessing this prop under any circumstances. It is provided by `@uidu/analytics` and integrated in the component
  */
  createAnalyticsEvent: CreateUIAnalyticsEvent,
|};

type AnalyticsEventsProps = {
  createAnalyticsEvent: CreateUIAnalyticsEvent | void,
};

type AnalyticsEventCreator<ProvidedProps: {}> = (
  create: CreateUIAnalyticsEvent,
  props: ProvidedProps,
) => ?UIAnalyticsEvent;

type EventMap<ProvidedProps: {}> = {
  [string]: AnalyticsEventPayload | AnalyticsEventCreator<ProvidedProps>,
};

// This component is used to grab the analytics functions off context.
// It uses legacy context, but provides an API similar to 16.3 context.
// This makes it easier to use with the forward ref API.
class AnalyticsContextConsumer extends Component<{
  children: CreateUIAnalyticsEvent => Node,
}> {
  static contextTypes = {
    getAtlaskitAnalyticsEventHandlers: PropTypes.func,
    getAtlaskitAnalyticsContext: PropTypes.func,
  };
  createAnalyticsEvent = (payload: AnalyticsEventPayload): UIAnalyticsEvent => {
    const {
      getAtlaskitAnalyticsEventHandlers,
      getAtlaskitAnalyticsContext,
    } = this.context;
    const context =
      (typeof getAtlaskitAnalyticsContext === 'function' &&
        getAtlaskitAnalyticsContext()) ||
      [];
    const handlers =
      (typeof getAtlaskitAnalyticsEventHandlers === 'function' &&
        getAtlaskitAnalyticsEventHandlers()) ||
      [];
    return new UIAnalyticsEvent({ context, handlers, payload });
  };
  render() {
    return this.props.children(this.createAnalyticsEvent);
  }
}

// patch the callback so it provides analytics information.
const modifyCallbackProp = <T: {}>(
  propName: string,
  eventMapEntry: AnalyticsEventPayload | AnalyticsEventCreator<T>,
  props: T,
  createAnalyticsEvent: CreateUIAnalyticsEvent,
) => (...args) => {
  const event =
    typeof eventMapEntry === 'function'
      ? eventMapEntry(createAnalyticsEvent, props)
      : createAnalyticsEvent(eventMapEntry);
  const providedCallback = props[propName];
  if (providedCallback) {
    providedCallback(...args, event);
  }
};

type Obj<T> = { [string]: T };
// helper that provides an easy way to map an object's values
// ({ string: A }, (string, A) => B) => { string: B }
const vmap = <A, B>(obj: Obj<A>, fn: (string, A) => B): Obj<B> =>
  Object.keys(obj).reduce((curr, k) => ({ ...curr, [k]: fn(k, obj[k]) }), {});

/* This must use $Supertype to work with multiple HOCs - https://github.com/facebook/flow/issues/6057#issuecomment-414157781
 * We also cannot alias this as a generic of withAnalyticsEvents itself as
 * that causes issues with multiple HOCs - https://github.com/facebook/flow/issues/6587
 */
type AnalyticsEventsWrappedProps<C> = $Diff<
  ElementConfig<$Supertype<C>>,
  AnalyticsEventsProps,
>;
export type AnalyticsEventsWrappedComp<C> = ComponentType<
  AnalyticsEventsWrappedProps<C>,
>;

export default function withAnalyticsEvents<P: {}, C: ComponentType<P>>(
  createEventMap: EventMap<AnalyticsEventsWrappedProps<C>> = {},
): C => AnalyticsEventsWrappedComp<C> {
  return WrappedComponent => {
    // $FlowFixMe - flow 0.67 doesn't know about forwardRef
    const WithAnalyticsEvents = React.forwardRef((props, ref) => {
      return (
        <AnalyticsContextConsumer>
          {createAnalyticsEvent => {
            const modifiedProps = vmap(createEventMap, (propName, entry) =>
              modifyCallbackProp(propName, entry, props, createAnalyticsEvent),
            );
            return (
              <WrappedComponent
                {...props}
                {...modifiedProps}
                createAnalyticsEvent={createAnalyticsEvent}
                ref={ref}
              />
            );
          }}
        </AnalyticsContextConsumer>
      );
    });

    WithAnalyticsEvents.displayName = `WithAnalyticsEvents(${WrappedComponent.displayName ||
      WrappedComponent.name})`;

    return WithAnalyticsEvents;
  };
}

export const withAnalyticsForSumTypeProps = withAnalyticsEvents;
