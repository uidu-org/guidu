import * as React from 'react';
import { FormattedMessage, MessageDescriptor } from 'react-intl';
import { messages } from '../components/i18n';

export type Formatter<
  T extends { [k: string]: MessageValue }
> = React.ComponentType<T & Partial<FormattedMessage.Props>>;

export const noPropFormatter = (
  messageDescriptor: MessageDescriptor,
): Formatter<{}> => props => (
  <FormattedMessage {...props} {...messageDescriptor} />
);

export const NoAccessWarning: Formatter<{ name: string }> = ({
  name,
  ...props
}) => (
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
