import { INPUT_METHOD } from '../analytics';

export type CardAppearance = 'inline' | 'block';
export type CardType = 'smart-card' | 'custom' | 'unsupported';

export interface CardProvider {
  resolve(url: string, appearance: CardAppearance): Promise<any>;
}

export interface CardOptions {
  provider?: Promise<CardProvider>;
  resolveBeforeMacros?: string[];
}

export type Request = {
  pos: number;
  url: string;
  appearance: CardAppearance;
  compareLinkText: boolean;
  source: CardReplacementInputMethod;
};

export type CardPluginState = {
  requests: Request[];
  provider: CardProvider | null;
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

export type CardPluginAction = SetProvider | Queue | Resolve;

export type CardReplacementInputMethod =
  | INPUT_METHOD.CLIPBOARD
  | INPUT_METHOD.AUTO_DETECT
  | INPUT_METHOD.FORMATTING
  | INPUT_METHOD.MANUAL
  | INPUT_METHOD.TYPEAHEAD;
