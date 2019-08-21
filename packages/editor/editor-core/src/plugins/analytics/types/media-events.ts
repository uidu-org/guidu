import { ACTION, ACTION_SUBJECT, ACTION_SUBJECT_ID } from './enums';
import { TrackAEP } from './events';

type MediaLinkAEP<Action> = TrackAEP<
  Action,
  ACTION_SUBJECT.MEDIA_SINGLE,
  ACTION_SUBJECT_ID.MEDIA_LINK,
  undefined
>;

export type MediaEventPayload =
  | MediaLinkAEP<ACTION.CHANGED_URL>
  | MediaLinkAEP<ACTION.UNLINK>
  | MediaLinkAEP<ACTION.VISITED>;
