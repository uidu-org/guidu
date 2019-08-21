import React from 'react';
import AnalyticsContextConsumer from './AnalyticsContextConsumer';
import { CreateEventMap, CreateUIAnalyticsEvent } from './types';

export interface WithAnalyticsEventsProps {
  /**
   * You should not be accessing this prop under any circumstances.
   * It is provided by `@atlaskit/analytics-next` and integrated in the component
   */
  createAnalyticsEvent?: CreateUIAnalyticsEvent;
}

const withAnalyticsEvents = (createEventMap?: CreateEventMap) => <
  TOriginalProps extends {},
  Component
>(
  WrappedComponent: React.JSXElementConstructor<TOriginalProps> & Component,
) => {
  type WrappedProps = TOriginalProps & WithAnalyticsEventsProps;

  const WithAnalyticsEvents = React.forwardRef<any, WrappedProps>(
    (props, ref) => (
      <AnalyticsContextConsumer<WrappedProps>
        createEventMap={createEventMap}
        wrappedComponentProps={props}
      >
        {({ createAnalyticsEvent, patchedEventProps }) => (
          // @ts-ignore
          <WrappedComponent
            {...(props as WrappedProps)}
            {...patchedEventProps}
            createAnalyticsEvent={createAnalyticsEvent}
            ref={ref}
          />
        )}
      </AnalyticsContextConsumer>
    ),
  );

  // @ts-ignore
  WithAnalyticsEvents.displayName = `WithAnalyticsEvents(${WrappedComponent.displayName ||
    WrappedComponent.name})`;

  return WithAnalyticsEvents;
};

export default withAnalyticsEvents;
