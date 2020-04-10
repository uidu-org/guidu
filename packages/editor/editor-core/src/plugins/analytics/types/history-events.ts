import { ACTION, ACTION_SUBJECT, ACTION_SUBJECT_ID } from './enums';
import { TABLE_ACTION } from './table-events';
import { TrackAEP } from './utils';

type HistoryAEP<Action> = TrackAEP<
  Action,
  ACTION_SUBJECT,
  ACTION | TABLE_ACTION,
  {
    [key: string]: any;
    actionSubjectId: ACTION_SUBJECT_ID | undefined | null;
  },
  undefined
>;

type UndoAEP = HistoryAEP<ACTION.UNDID>;

type RedoAEP = HistoryAEP<ACTION.REDID>;

export type HistoryEventPayload = UndoAEP | RedoAEP;
