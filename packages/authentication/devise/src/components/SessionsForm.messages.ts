import { defineMessages, FormattedMessage } from 'react-intl';

export type MessageKey =
  | 'simple_sessions_title'
  | 'simple_sessions_description'
  | 'simple_sessions_primary_cta'
  | 'simple_sessions_secondary_cta'
  | 'simple_sessions_email_label'
  | 'simple_sessions_password_label'
  | 'simple_sessions_remember_me_label';

type Messages = { [K in MessageKey]: FormattedMessage.MessageDescriptor };

const messageDescriptors: Messages = {
  simple_sessions_title: {
    id: 'guidu.devise.simple_sessions_title',
    defaultMessage: 'Sign in',
    description: 'simple_sessions_title',
  },
  simple_sessions_description: {
    id: 'guidu.devise.simple_sessions_description',
    defaultMessage: 'Sign in with your email and password',
    description: 'simple_sessions_description',
  },
  simple_sessions_primary_cta: {
    id: 'guidu.devise.simple_sessions_primary_cta',
    defaultMessage: 'Sign in',
    description: 'simple_sessions_primary_cta',
  },
  simple_sessions_secondary_cta: {
    id: 'guidu.devise.simple_sessions_secondary_cta',
    defaultMessage: 'Create an account',
    description: 'simple_sessions_secondary_cta',
  },
  simple_sessions_email_label: {
    id: 'guidu.devise.simple_sessions_email_label',
    defaultMessage: 'Insert your email',
    description: 'simple_sessions_email_label',
  },
  simple_sessions_password_label: {
    id: 'guidu.devise.simple_sessions_password_label',
    defaultMessage: 'Insert your password',
    description: 'simple_sessions_email_label',
  },
  simple_sessions_remember_me_label: {
    id: 'guidu.devise.simple_sessions_remember_me_label',
    defaultMessage: 'Remember me for next sessions',
    description: 'simple_sessions_email_label',
  },
};

export const messages = defineMessages(messageDescriptors);
