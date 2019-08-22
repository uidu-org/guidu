import * as React from 'react';
import { FormattedMessage, MessageDescriptor } from 'react-intl';
import { messages } from '../components/i18n';

export const noPropFormatter = (
  messageDescriptor: MessageDescriptor,
) => props => <FormattedMessage {...props} {...messageDescriptor} />;

export const NoAccessWarning = ({ name, ...props }) => (
  <FormattedMessage
    {...props}
    values={{ name }}
    {...messages.noAccessWarning}
  />
);

export const NoAccessLabel = noPropFormatter(messages.noAccessLabel);
export const DefaultHeadline = noPropFormatter(messages.defaultHeadline);
export const DefaultAdvisedAction = noPropFormatter(
  messages.defaultAdvisedAction,
);
export const LoginAgain = noPropFormatter(messages.loginAgain);
export const DifferentText = noPropFormatter(messages.differentText);
export const TeamMentionHighlightTitle = noPropFormatter(
  messages.TeamMentionHighlightTitle,
);
export const TeamMentionHighlightCloseTooltip = noPropFormatter(
  messages.TeamMentionHighlightCloseButtonToolTip,
);
export const TeamMentionHighlightDescription = noPropFormatter(
  messages.TeamMentionHighlightDescription,
);
export const TeamMentionHighlightDescriptionLink = noPropFormatter(
  messages.TeamMentionHighlightDescriptionLink,
);
