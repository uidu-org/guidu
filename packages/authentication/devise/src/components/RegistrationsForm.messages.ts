import { defineMessages, MessageDescriptor } from 'react-intl';

export type MessageKey =
  | 'simple_registrations_title'
  | 'simple_registrations_description'
  | 'simple_registrations_primary_cta'
  | 'simple_registrations_secondary_cta'
  | 'simple_registrations_email_label'
  | 'simple_registrations_password_label'
  | 'simple_registrations_remember_me_label';

type Messages = { [K in MessageKey]: MessageDescriptor };

const messageDescriptors: Messages = {
  simple_registrations_title: {
    id: 'guidu.devise.simple_registrations_title',
    defaultMessage: 'Sign up',
    description: 'simple_registrations_title',
  },
  simple_registrations_description: {
    id: 'guidu.devise.simple_registrations_description',
    defaultMessage: 'Sign up with to discover stories and make impact',
    description: 'simple_registrations_description',
  },
  simple_registrations_primary_cta: {
    id: 'guidu.devise.simple_registrations_primary_cta',
    defaultMessage: 'Sign up',
    description: 'simple_registrations_primary_cta',
  },
  simple_registrations_secondary_cta: {
    id: 'guidu.devise.simple_registrations_secondary_cta',
    defaultMessage: 'Already have an account?',
    description: 'simple_registrations_secondary_cta',
  },
  simple_registrations_email_label: {
    id: 'guidu.devise.simple_registrations_email_label',
    defaultMessage: 'Insert your email',
    description: 'simple_registrations_email_label',
  },
  simple_registrations_password_label: {
    id: 'guidu.devise.simple_registrations_password_label',
    defaultMessage: 'Choose a password',
    description: 'simple_registrations_email_label',
  },
  simple_registrations_remember_me_label: {
    id: 'guidu.devise.simple_registrations_remember_me_label',
    defaultMessage: 'Remember me for next registrations',
    description: 'simple_registrations_email_label',
  },
};

export const messages = defineMessages(messageDescriptors);
