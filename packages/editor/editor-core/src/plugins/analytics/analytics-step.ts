import { CreateUIAnalyticsEvent } from '@atlaskit/analytics-next';
import { Node as PMNode } from 'prosemirror-model';
import { Step, StepResult, StepMap, ReplaceStep } from 'prosemirror-transform';
import { Slice } from 'prosemirror-model';
import {
  AnalyticsEventPayloadWithChannel,
  EVENT_TYPE,
  TABLE_ACTION,
  ACTION,
} from './types';
import { fireAnalyticsEvent } from './utils';

export const analyticsStepType = 'atlaskit-analytics';

const actionsToIgnore: (ACTION | TABLE_ACTION)[] = [
  ACTION.INVOKED,
  ACTION.OPENED,
];

/** Creates undo event from a normal analytics event */
const createUndoEvent = (analyticsEvent: AnalyticsEventPayloadWithChannel) =>
  ({
    ...analyticsEvent,
    payload: {
      action: ACTION.UNDID,
      actionSubject: analyticsEvent.payload.actionSubject,
      actionSubjectId: analyticsEvent.payload.action,
      attributes: {
        ...analyticsEvent.payload.attributes,
        actionSubjectId: analyticsEvent.payload.actionSubjectId,
      },
      eventType: EVENT_TYPE.TRACK,
    },
  } as AnalyticsEventPayloadWithChannel);

/** Toggles event action between undo & redo */
const toggleEventAction = (analyticsEvent: AnalyticsEventPayloadWithChannel) =>
  ({
    ...analyticsEvent,
    payload: {
      ...analyticsEvent.payload,
      action:
        analyticsEvent.payload.action === ACTION.UNDID
          ? ACTION.REDID
          : ACTION.UNDID,
    },
  } as AnalyticsEventPayloadWithChannel);

/**
 * Custom Prosemirror Step to fire our GAS V3 analytics events
 * Using a Step means that it will work with prosemirror-history and we get
 * undo/redo events for free
 */
export class AnalyticsStep extends Step {
  analyticsEvents: AnalyticsEventPayloadWithChannel[] = [];
  createAnalyticsEvent: CreateUIAnalyticsEvent;

  constructor(
    createAnalyticsEvent: CreateUIAnalyticsEvent,
    analyticsEvents: AnalyticsEventPayloadWithChannel[],
  ) {
    super();
    this.createAnalyticsEvent = createAnalyticsEvent;
    this.analyticsEvents = analyticsEvents;
  }

  /**
   * Generate new undo/redo analytics event when step is inverted
   */
  invert() {
    const analyticsEvents: AnalyticsEventPayloadWithChannel[] = this.analyticsEvents
      .filter(
        analyticsEvent =>
          actionsToIgnore.indexOf(analyticsEvent.payload.action) === -1,
      )
      .map(analyticsEvent => {
        if (
          analyticsEvent.payload.action === ACTION.UNDID ||
          analyticsEvent.payload.action === ACTION.REDID
        ) {
          return toggleEventAction(analyticsEvent);
        } else {
          return createUndoEvent(analyticsEvent);
        }
      });

    return new AnalyticsStep(this.createAnalyticsEvent, analyticsEvents);
  }

  apply(doc: PMNode) {
    for (const analyticsEvent of this.analyticsEvents) {
      fireAnalyticsEvent(this.createAnalyticsEvent)(analyticsEvent);
    }

    return StepResult.ok(doc);
  }

  map() {
    return null;
  }

  getMap() {
    return new StepMap([0, 0, 0]);
  }

  toJSON() {
    return {
      stepType: analyticsStepType,
    };
  }

  static fromJSON() {
    return new ReplaceStep(0, 0, Slice.empty);
  }
}

/** Register this step with Prosemirror */
Step.jsonID(analyticsStepType, AnalyticsStep);
