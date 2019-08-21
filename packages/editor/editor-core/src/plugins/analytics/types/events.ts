import { Dispatch } from '../../../event-dispatcher';
import { ACTION_SUBJECT, EVENT_TYPE } from './enums';
import { ErrorEventPayload } from './error-events';
import { FormatEventPayload } from './format-events';
import { GeneralEventPayload } from './general-events';
import { InsertEventPayload } from './insert-events';
import { MediaEventPayload } from './media-events';
import { NodeEventPayload } from './node-events';
import { PasteEventPayload } from './paste-events';
import { SubstituteEventPayload } from './substitute-events';
import { TableEventPayload } from './table-events';

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
  | MediaEventPayload
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
