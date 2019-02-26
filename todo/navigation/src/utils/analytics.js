// @flow

import { type ComponentType } from 'react';
import {
  withAnalyticsEvents,
  type WithAnalyticsEventsProps,
} from '@atlaskit/analytics-next';

export const navigationChannel = 'navigation';

export type CollapseExpandTrigger = 'chevron' | 'resizerClick' | 'resizerDrag';

export const navigationExpandedCollapsed = (
  createAnalyticsEvent: $PropertyType<
    WithAnalyticsEventsProps,
    'createAnalyticsEvent',
  >,
  {
    isCollapsed,
    trigger,
  }: { isCollapsed: boolean, trigger: CollapseExpandTrigger },
) =>
  createAnalyticsEvent({
    action: isCollapsed ? 'collapsed' : 'expanded',
    actionSubject: 'productNavigation',
    attributes: {
      trigger,
    },
  }).fire(navigationChannel);

/** Internal analytics fired on the fabric navigation channel. Not intended to
 * pass event instances to consumers.
 */
export const withGlobalItemAnalytics = (Component: ComponentType<*>) => {
  return withAnalyticsEvents({
    onClick: (createAnalyticsEvent, props) => {
      if (props.id) {
        const event = createAnalyticsEvent({
          action: 'clicked',
          actionSubject: 'navigationItem',
          actionSubjectId: props.id,
          attributes: {
            navigationLayer: 'global',
          },
        });
        event.fire(navigationChannel);
      }
      return null;
    },
  })(Component);
};
