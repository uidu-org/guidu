import { CreateUIAnalyticsEvent } from '@uidu/analytics';
import { Node as PMNode, Slice } from 'prosemirror-model';
import {
  Mappable,
  ReplaceStep,
  Step,
  StepMap,
  StepResult,
} from 'prosemirror-transform';
import { fireAnalyticsEvent } from './fire-analytics-event';
import {
  ACTION,
  AnalyticsEventPayloadWithChannel,
  EVENT_TYPE,
  TABLE_ACTION,
} from './types';

export const analyticsStepType = 'uidu-analytics';

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
  pos?: number;

  constructor(
    createAnalyticsEvent: CreateUIAnalyticsEvent,
    analyticsEvents: AnalyticsEventPayloadWithChannel[],
    pos?: number, // Used to create the map, prevent splitting history.
  ) {
    super();
    this.createAnalyticsEvent = createAnalyticsEvent;
    this.analyticsEvents = analyticsEvents;
    this.pos = pos;
  }

  /**
   * Generate new undo/redo analytics event when step is inverted
   */
  invert() {
    const analyticsEvents: AnalyticsEventPayloadWithChannel[] = this.analyticsEvents
      .filter(
        (analyticsEvent) =>
          actionsToIgnore.indexOf(analyticsEvent.payload.action) === -1,
      )
      .map((analyticsEvent) => {
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

  map(mapping: Mappable) {
    let newPos = this.pos;
    if (typeof newPos === 'number') {
      newPos = mapping.map(newPos);
    }
    // Return the same events, this step will never be removed
    return new AnalyticsStep(
      this.createAnalyticsEvent,
      this.analyticsEvents,
      newPos,
    );
  }

  getMap() {
    if (typeof this.pos === 'number') {
      return new StepMap([this.pos, 0, 0]);
    }
    return new StepMap([]);
  }

  merge(other: Step) {
    if (other instanceof AnalyticsStep) {
      const otherAnalyticsEvents = (other as AnalyticsStep).analyticsEvents;
      return new AnalyticsStep(this.createAnalyticsEvent, [
        ...otherAnalyticsEvents,
        ...this.analyticsEvents,
      ]);
    }
    return null;
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
