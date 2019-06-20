import { Dispatch } from '../../../event-dispatcher';
import { EVENT_TYPE, ACTION_SUBJECT } from './enums';
import { GeneralEventPayload } from './general-events';
import { FormatEventPayload } from './format-events';
import { SubstituteEventPayload } from './substitute-events';
import { InsertEventPayload } from './insert-events';
import { NodeEventPayload } from './node-events';
import { TableEventPayload } from './table-events';
import { PasteEventPayload } from './paste-events';
import { ErrorEventPayload } from './error-events';

type AEP<Action, ActionSubject, ActionSubjectID, Attributes, EventType> = {
  action: Action;
  actionSubject: ActionSubject;
  actionSubjectId?: ActionSubjectID;
  attributes?: Attributes;
  eventType: EventType;
};

export type UIAEP<Action, ActionSubject, ActionSubjectID, Attributes> = AEP<
  Action,
  ActionSubject,
  ActionSubjectID,
  Attributes,
  EVENT_TYPE.UI
>;

export type TrackAEP<Action, ActionSubject, ActionSubjectID, Attributes> = AEP<
  Action,
  ActionSubject,
  ActionSubjectID,
  Attributes,
  EVENT_TYPE.TRACK
>;

export type OperationalAEP<
  Action,
  ActionSubject,
  ActionSubjectID,
  Attributes
> = AEP<
  Action,
  ActionSubject,
  ActionSubjectID,
  Attributes,
  EVENT_TYPE.OPERATIONAL
>;

export type ScreenAEP<Action, ActionSubject, ActionSubjectID, Attributes> = AEP<
  Action,
  ActionSubject,
  ActionSubjectID,
  Attributes,
  EVENT_TYPE.SCREEN
>;

export type TableAEP<Action, Attributes> = TrackAEP<
  Action,
  ACTION_SUBJECT.TABLE,
  null,
  Attributes
>;

export type AnalyticsEventPayload =
  | GeneralEventPayload
  | FormatEventPayload
  | SubstituteEventPayload
  | InsertEventPayload
  | NodeEventPayload
  | TableEventPayload
  | PasteEventPayload
  | ErrorEventPayload;

export type AnalyticsEventPayloadWithChannel = {
  channel: string;
  payload: AnalyticsEventPayload;
};

export type AnalyticsDispatch = Dispatch<{
  payload: AnalyticsEventPayload;
  channel?: string;
}>;
