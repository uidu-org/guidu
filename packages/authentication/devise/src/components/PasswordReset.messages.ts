import { defineMessages, FormattedMessage } from 'react-intl';

export type MessageKey =
  | 'password_reset_title'
  | 'password_reset_description'
  | 'password_reset_primary_cta'
  | 'password_reset_secondary_cta'
  | 'password_reset_password_label';

type Messages = { [K in MessageKey]: FormattedMessage.MessageDescriptor };

const messageDescriptors: Messages = {
  password_reset_title: {
    id: 'guidu.devise.password_reset_title',
    defaultMessage: 'Reset your password',
    description: 'password_reset_title',
  },
  password_reset_description: {
    id: 'guidu.devise.password_reset_description',
    defaultMessage: 'Choose a new password to access your account',
    description: 'password_reset_description',
  },
  password_reset_primary_cta: {
    id: 'guidu.devise.password_reset_primary_cta',
    defaultMessage: 'Confirm',
    description: 'password_reset_primary_cta',
  },
  password_reset_secondary_cta: {
    id: 'guidu.devise.password_reset_secondary_cta',
    defaultMessage: 'Sign in',
    description: 'password_reset_secondary_cta',
  },
  password_reset_password_label: {
    id: 'guidu.devise.password_reset_email_label',
    defaultMessage: 'Insert a new password',
    description: 'password_reset_email_label',
  },
};

export const messages = defineMessages(messageDescriptors);
