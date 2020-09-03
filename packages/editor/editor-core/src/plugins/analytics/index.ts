import analyticsPlugin from './plugin';
import { analyticsPluginKey as pluginKey } from './plugin-key';

export type { HigherOrderCommand } from '../../types/command';
export { fireAnalyticsEvent } from './fire-analytics-event';
export type {
  FireAnalyticsCallback,
  FireAnalyticsEvent,
} from './fire-analytics-event';
export {
  ACTION,
  ACTION_SUBJECT,
  ACTION_SUBJECT_ID,
  EVENT_TYPE,
  FULL_WIDTH_MODE,
  INDENT_DIR,
  INDENT_TYPE,
  INPUT_METHOD,
  LINK_REPRESENTATION,
  LINK_RESOURCE,
  LINK_STATUS,
  MODE,
  PANEL_TYPE,
  PasteContents,
  PasteSources,
  PasteTypes,
  PLATFORMS,
  PUNC,
  SYMBOL,
  TABLE_ACTION,
  TABLE_BREAKOUT,
  USER_CONTEXT,
} from './types';
export type {
  AnalyticsDispatch,
  AnalyticsEventPayload,
  AnalyticsEventPayloadWithChannel,
  ErrorEventPayload,
  FormatEventPayload,
  GeneralEventPayload,
  HistoryEventPayload,
  InputMethodInsertLink,
  InputMethodInsertMedia,
  InsertEventPayload,
  MediaAltTextActionType,
  MediaEventPayload,
  PasteContent,
  PasteEventPayload,
  PasteSource,
  PasteType,
  PASTE_ACTION_SUBJECT_ID,
  SubstituteEventPayload,
  TableEventPayload,
} from './types';
export type { DispatchAnalyticsEvent } from './types/dispatch-analytics-event';
export {
  addAnalytics,
  findInsertLocation,
  getAnalyticsEventsFromTransaction,
  getSelectionType,
  getStateContext,
  ruleWithAnalytics,
  withAnalytics,
} from './utils';

export const analyticsPluginKey = pluginKey;
export default analyticsPlugin;
