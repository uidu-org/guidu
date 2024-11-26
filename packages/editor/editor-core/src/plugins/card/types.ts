import {
  CardAppearance,
  CardProvider,
  Providers,
} from '@uidu/editor-common/provider-factory';
import { INPUT_METHOD } from '../analytics/types/enums';

export {
  CardAppearance,
  CardProvider,
} from '@uidu/editor-common/provider-factory';

export type CardInfo = {
  title?: string;
  url?: string;

  pos: number;
};

export interface CardOptions {
  provider?: Providers['cardProvider'];
  resolveBeforeMacros?: string[];
  allowBlockCards?: boolean;
}

export type Request = {
  pos: number;
  url: string;
  appearance: CardAppearance;
  compareLinkText: boolean;
};

export type CardPluginState = {
  requests: Request[];
  provider: CardProvider | null;
  cards: CardInfo[];
  showLinkingToolbar: boolean;
};

// actions
export type SetProvider = {
  type: 'SET_PROVIDER';
  provider: CardProvider | null;
};

export type Queue = {
  type: 'QUEUE';
  requests: Request[];
};

export type Resolve = {
  type: 'RESOLVE';
  url: string;
};

export type Register = {
  type: 'REGISTER';
  info: CardInfo;
};

export type ShowLinkToolbar = {
  type: 'SHOW_LINK_TOOLBAR';
};

export type HideLinkToolbar = {
  type: 'HIDE_LINK_TOOLBAR';
};

export type CardPluginAction =
  | SetProvider
  | Queue
  | Resolve
  | Register
  | ShowLinkToolbar
  | HideLinkToolbar;

export type CardReplacementInputMethod =
  | INPUT_METHOD.CLIPBOARD
  | INPUT_METHOD.AUTO_DETECT
  | INPUT_METHOD.FORMATTING
  | INPUT_METHOD.MANUAL
  | INPUT_METHOD.TYPEAHEAD;
