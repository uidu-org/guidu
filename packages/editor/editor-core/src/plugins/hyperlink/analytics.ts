import {
  ACTION,
  ACTION_SUBJECT,
  ACTION_SUBJECT_ID,
  AnalyticsEventPayload,
  EVENT_TYPE,
  InputMethodInsertLink,
} from '../analytics';

export function getLinkCreationAnalyticsEvent(
  inputMethod: InputMethodInsertLink,
  url: string,
): AnalyticsEventPayload {
  // Remove protocol and www., if either exists
  const withoutProtocol = url.toLowerCase().replace(/^(.*):\/\//, '');
  const withoutWWW = withoutProtocol.replace(/^(www\.)/, '');

  // Remove port, fragment, path, query string
  const linkDomain = withoutWWW.replace(/[:\/?#](.*)$/, '');

  return {
    action: ACTION.INSERTED,
    actionSubject: ACTION_SUBJECT.DOCUMENT,
    actionSubjectId: ACTION_SUBJECT_ID.LINK,
    attributes: { inputMethod },
    eventType: EVENT_TYPE.TRACK,
    nonPrivacySafeAttributes: { linkDomain },
  };
}
