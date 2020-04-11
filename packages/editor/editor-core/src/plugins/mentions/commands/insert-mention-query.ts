import {
  ACTION,
  ACTION_SUBJECT,
  ACTION_SUBJECT_ID,
  EVENT_TYPE,
  withAnalytics,
} from '../../analytics';
import { TOOLBAR_MENU_TYPE } from '../../insert-block/ui/ToolbarInsertBlock/types';
import { insertTypeAheadQuery } from '../../type-ahead/commands/insert-query';

export function insertMentionQuery(inputMethod: TOOLBAR_MENU_TYPE) {
  return withAnalytics({
    action: ACTION.INVOKED,
    actionSubject: ACTION_SUBJECT.TYPEAHEAD,
    actionSubjectId: ACTION_SUBJECT_ID.TYPEAHEAD_MENTION,
    attributes: { inputMethod },
    eventType: EVENT_TYPE.UI,
  })(insertTypeAheadQuery('@'));
}
