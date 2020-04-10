import analyticsPlugin from './plugin';
import { analyticsPluginKey as pluginKey } from './plugin-key';

export { HigherOrderCommand } from '../../types/command';
export {
  FireAnalyticsCallback,
  fireAnalyticsEvent,
  FireAnalyticsEvent,
} from './fire-analytics-event';
export {
  ACTION,
  ACTION_SUBJECT,
  ACTION_SUBJECT_ID,
  AnalyticsDispatch,
  AnalyticsEventPayload,
  AnalyticsEventPayloadWithChannel,
  ErrorEventPayload,
  EVENT_TYPE,
  FormatEventPayload,
  FULL_WIDTH_MODE,
  GeneralEventPayload,
  HistoryEventPayload,
  INDENT_DIR,
  INDENT_TYPE,
  InputMethodInsertLink,
  InputMethodInsertMedia,
  INPUT_METHOD,
  InsertEventPayload,
  LINK_REPRESENTATION,
  LINK_RESOURCE,
  LINK_STATUS,
  MediaAltTextActionType,
  MediaEventPayload,
  MODE,
  PANEL_TYPE,
  PasteContent,
  PasteContents,
  PasteEventPayload,
  PasteSource,
  PasteSources,
  PasteType,
  PasteTypes,
  PASTE_ACTION_SUBJECT_ID,
  PLATFORMS,
  PUNC,
  SubstituteEventPayload,
  SYMBOL,
  TableEventPayload,
  TABLE_ACTION,
  TABLE_BREAKOUT,
  USER_CONTEXT,
} from './types';
export { DispatchAnalyticsEvent } from './types/dispatch-analytics-event';
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
