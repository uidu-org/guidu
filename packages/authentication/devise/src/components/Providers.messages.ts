import { defineMessages, MessageDescriptor } from 'react-intl';

export type MessageKey =
  | 'privacy_intro'
  | 'sessions_title'
  | 'sessions_description'
  | 'sessions_with_provider'
  | 'registrations_title'
  | 'registrations_description'
  | 'registrations_with_provider';

type Messages = { [K in MessageKey]: MessageDescriptor };

const messageDescriptors: Messages = {
  privacy_intro: {
    id: 'guidu.devise.privacy_intro',
    defaultMessage:
      "Per far funzionare uidu, registriamo i dati degli utenti e li condividiamo con alcuni provider. Registrandoti, accetti le Condizioni d'uso e confermi di aver letto e compreso la Privacy Policy.",
    description: '',
  },
  sessions_title: {
    id: 'guidu.devise.sessions_title',
    defaultMessage: 'Sign in',
    description: 'Allows user to perform an action again',
  },
  sessions_description: {
    id: 'guidu.devise.sessions_description',
    defaultMessage:
      "Accedi per visualizzare la tua homepage, seguire le tue organizzazioni preferite, scoprire quello che di buono c'è vicino a te.",
    description: '',
  },

  sessions_with_provider: {
    id: 'guidu.devise.sessions_with_provider',
    defaultMessage: 'Sign in with {provider}',
    description: '',
  },
  registrations_title: {
    id: 'guidu.devise.registrations_title',
    defaultMessage: 'Sign up with your email',
    description: '',
  },
  registrations_description: {
    id: 'guidu.devise.registrations_title',
    defaultMessage:
      "Crea un account per personalizzare la tua homepage, seguire le tue organizzazioni preferite, scoprire quello che di buono c'è vicino a te, e molto altro.",
    description: '',
  },
  registrations_with_provider: {
    id: 'guidu.devise.registrations_title',
    defaultMessage: 'Sign up with {provider}',
    description: '',
  },
};

export const messages = defineMessages(messageDescriptors);
