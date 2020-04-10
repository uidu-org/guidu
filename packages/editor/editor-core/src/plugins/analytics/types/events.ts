import { Dispatch } from '../../../event-dispatcher';
import { SimplifiedNode } from '../../../utils/document-logger';
import { ACTION, ACTION_SUBJECT, ACTION_SUBJECT_ID } from './enums';
import { ExperimentalEventPayload } from './experimental-events';
import { FormatEventPayload } from './format-events';
import { GeneralEventPayload } from './general-events';
import { HistoryEventPayload } from './history-events';
import { InsertEventPayload } from './insert-events';
import { MediaEventPayload } from './media-events';
import { NodeEventPayload } from './node-events';
import { PasteEventPayload } from './paste-events';
import { SubstituteEventPayload } from './substitute-events';
import { TableEventPayload } from './table-events';
import { OperationalAEP } from './utils';

export type AnalyticsEventPayload =
  | GeneralEventPayload
  | FormatEventPayload
  | SubstituteEventPayload
  | InsertEventPayload
  | NodeEventPayload
  | MediaEventPayload
  | TableEventPayload
  | PasteEventPayload
  | ErrorEventPayload
  | HistoryEventPayload
  | ExperimentalEventPayload; // Used for A/B testing

export type AnalyticsEventPayloadWithChannel = {
  channel: string;
  payload: AnalyticsEventPayload;
};

export type AnalyticsDispatch = Dispatch<{
  payload: AnalyticsEventPayload;
  channel?: string;
}>;

type InvalidTransactionErrorAEP = OperationalAEP<
  ACTION.DISPATCHED_INVALID_TRANSACTION,
  ACTION_SUBJECT.EDITOR,
  undefined,
  {
    analyticsEventPayloads: AnalyticsEventPayloadWithChannel[];
    invalidNodes: (SimplifiedNode | string)[];
  },
  undefined
>;

type FailedToUnmountErrorAEP = OperationalAEP<
  ACTION.FAILED_TO_UNMOUNT,
  ACTION_SUBJECT.EDITOR,
  ACTION_SUBJECT_ID.REACT_NODE_VIEW,
  {
    error: Error;
    domNodes: {
      container?: string;
      child?: string;
    };
  },
  undefined
>;

export type ErrorEventPayload =
  | InvalidTransactionErrorAEP
  | FailedToUnmountErrorAEP;
