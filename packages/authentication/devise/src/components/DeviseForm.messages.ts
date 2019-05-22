import { defineMessages, FormattedMessage } from 'react-intl';

export type MessageKey =
  | 'email_sessions_email_title'
  | 'email_sessions_email_description'
  | 'email_sessions_info_title'
  | 'email_sessions_info_description'
  | 'email_sessions_password_title'
  | 'email_sessions_password_description'
  | 'email_registrations_email_title'
  | 'email_registrations_email_description'
  | 'email_registrations_info_title'
  | 'email_registrations_info_description'
  | 'email_registrations_password_title'
  | 'email_registrations_password_description'
;

type Messages = { [K in MessageKey]: FormattedMessage.MessageDescriptor };

const messageDescriptors: Messages = {
email_sessions_email_title: {
  id: 'guidu.devise.email_sessions_email_title',
  defaultMessage: 'Sign in with your email',
  description: 'email_sessions_email_title',
},
email_sessions_email_description: {
  id: 'guidu.devise.email_sessions_email_description',
  defaultMessage: 'Use your favourite email account',
  description: 'email_sessions_email_description',
},
email_sessions_info_title: {
  id: 'guidu.devise.email_sessions_info_title',
  defaultMessage: 'Fill your data to sign in',
  description: 'email_sessions_info_title',
},
email_sessions_info_description: {
  id: 'guidu.devise.email_sessions_info_description',
  defaultMessage: 'email_sessions_info_description',
  description: 'email_sessions_info_description',
},
email_sessions_password_title: {
  id: 'guidu.devise.email_sessions_password_title',
  defaultMessage: 'Insert your password',
  description: 'email_sessions_password_title',
},
email_sessions_password_description: {
  id: 'guidu.devise.email_sessions_password_description',
  defaultMessage: 'email_sessions_password_description',
  description: 'email_sessions_password_description',
},
email_registrations_email_title: {
  id: 'guidu.devise.email_registrations_email_title',
  defaultMessage: 'Sign up with your email',
  description: 'email_registrations_email_title',
},
email_registrations_email_description: {
  id: 'guidu.devise.email_registrations_email_description',
  defaultMessage: 'Use a valid email address',
  description: 'email_registrations_email_description',
},
email_registrations_info_title: {
  id: 'guidu.devise.email_registrations_info_title',
  defaultMessage: 'email_registrations_info_title',
  description: 'email_registrations_info_title',
},
email_registrations_info_description: {
  id: 'guidu.devise.email_registrations_info_description',
  defaultMessage: 'email_registrations_info_description',
  description: 'email_registrations_info_description',
},
email_registrations_password_title: {
  id: 'guidu.devise.email_registrations_password_title',
  defaultMessage: 'email_registrations_password_title',
  description: 'email_registrations_password_title',
},
email_registrations_password_description: {
  id: 'guidu.devise.email_registrations_password_description',
  defaultMessage: 'email_registrations_password_description',
  description: 'email_registrations_password_description',
},
};

export const messages = defineMessages(messageDescriptors);
