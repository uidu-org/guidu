import { defineMessages, FormattedMessage } from 'react-intl';

export type MessageKey =
  | 'password_recovery_title'
  | 'password_recovery_description'
  | 'password_recovery_primary_cta'
  | 'password_recovery_secondary_cta'
  | 'password_recovery_email_label';

type Messages = { [K in MessageKey]: FormattedMessage.MessageDescriptor };

const messageDescriptors: Messages = {
  password_recovery_title: {
    id: 'guidu.devise.password_recovery_title',
    defaultMessage: 'Recover your password',
    description: 'password_recovery_title',
  },
  password_recovery_description: {
    id: 'guidu.devise.password_recovery_description',
    defaultMessage:
      "Insert your email, we'll send you instructions on how to reset your account",
    description: 'password_recovery_description',
  },
  password_recovery_primary_cta: {
    id: 'guidu.devise.password_recovery_primary_cta',
    defaultMessage: 'Send email',
    description: 'password_recovery_primary_cta',
  },
  password_recovery_secondary_cta: {
    id: 'guidu.devise.password_recovery_secondary_cta',
    defaultMessage: 'Sign in',
    description: 'password_recovery_secondary_cta',
  },
  password_recovery_email_label: {
    id: 'guidu.devise.password_recovery_email_label',
    defaultMessage: 'Insert your email',
    description: 'password_recovery_email_label',
  },
};

export const messages = defineMessages(messageDescriptors);
