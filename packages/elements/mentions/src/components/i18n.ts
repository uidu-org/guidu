import { defineMessages } from 'react-intl';

export const messages = defineMessages({
  unknownUserError: {
    id: 'uidu.mentions.unknow.user.error',
    defaultMessage: 'Unknown user {userId}',
    description: 'Mention user name could not be found or look up failed',
  },
  noAccessWarning: {
    id: 'uidu.mentions.noAccess.warning',
    defaultMessage: "{name} won't be notified as they have no access",
    description:
      "Warning message to show that the mentioned user won't be notified",
  },
  noAccessLabel: {
    id: 'uidu.mentions.noAccess.label',
    defaultMessage: 'No access',
    description: 'Label for no access icon',
  },
  defaultHeadline: {
    id: 'uidu.mentions.error.defaultHeadline',
    defaultMessage: 'Something went wrong',
    description:
      'Error message shown when there is an error communicating with backend',
  },
  defaultAdvisedAction: {
    id: 'uidu.mentions.error.defaultAction',
    defaultMessage: 'Try again in a few seconds',
    description: 'Default advised action when an error occurs',
  },
  loginAgain: {
    id: 'uidu.mentions.error.loginAgain',
    defaultMessage: 'Try logging out then in again',
    description:
      'Login again message when there is an authentication error occurs',
  },
  differentText: {
    id: 'uidu.mentions.error.differentText',
    defaultMessage: 'Try entering different text',
    description: 'Enter different text message when a forbidden error occurs',
  },
  memberCountWithoutYou: {
    id: 'uidu.mentions.mentions.team.member.count',
    defaultMessage: '{0, plural, one {1 member} other {{0} members}}',
    description:
      'Byline to show the number of members in the team when the current user is not a member of the team',
  },
  memberCountWithYou: {
    id: 'uidu.mentions.mentions.team.member.count.including.you',
    defaultMessage:
      '{0, plural, one {1 member} other {{0} members}}, including you',
    description:
      'Byline to show the number of members in the team when the current user is also a member of the team',
  },
  plus50MembersWithoutYou: {
    id: 'uidu.mentions.mentions.team.member.50plus',
    defaultMessage: '50+ members',
    description:
      'Byline to show the number of members in the team when the number exceeds 50',
  },
  plus50MembersWithYou: {
    id: 'uidu.mentions.mentions.team.member.50plus.including.you',
    defaultMessage: '50+ members, including you',
    description:
      'Byline to show the number of members in the team when the number exceeds 50 and also includes the current user',
  },
  TeamMentionHighlightTitle: {
    id: 'uidu.mentions.mentions.team.mention.highlight.title',
    defaultMessage: 'Mention your team',
    description:
      'Title of the highlight shown in the mention tpyeahead. This is related to team mentions',
  },
  TeamMentionHighlightDescription: {
    id: 'uidu.mentions.mentions.team.mention.highlight.description',
    defaultMessage: 'Get everyone on the page with one click. No team?',
    description:
      'Description of the highlight shown in the mention tpyeahead. This is related to team mentions',
  },
  TeamMentionHighlightDescriptionLink: {
    id: 'uidu.mentions.mentions.team.mention.highlight.description.link',
    defaultMessage: 'Start one.',
    description:
      'Team creation link in the description of the highlight shown in the mention tpyeahead. This is related to team mentions',
  },
  TeamMentionHighlightCloseButtonToolTip: {
    id: 'uidu.mentions.mentions.team.meantion.highlight.close.button.tooltip',
    defaultMessage: 'Dismiss',
    description:
      'Closes the highlight component when this button is clicked. This text for the tooltip of that button',
  },
});
