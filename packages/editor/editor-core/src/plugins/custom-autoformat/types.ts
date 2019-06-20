import { ADFEntity } from '@atlaskit/adf-utils';
import { Node as ProsemirrorNode } from 'prosemirror-model';

export type AutoformatReplacement = ADFEntity;

export type AutoformatHandler = (
  match: Array<string>,
) => Promise<AutoformatReplacement>;

export type Ruleset = {
  [regex: string]: AutoformatHandler;
};

export interface AutoformattingProvider {
  getRules(): Promise<Ruleset>;
}

export type AutoformatCandidate = {
  start: number;
  end: number;
  match: string[];
};

export type AutoformatMatch = {
  matchString: string;
  replacement?: ProsemirrorNode;
};

export type CustomAutoformatState = {
  resolving: Array<AutoformatCandidate>;
  matches: Array<AutoformatMatch>;
};

// actions
export type CustomAutoformatMatched = {
  action: 'matched';
  start: number;
  end: number;
  match: string[];
};

export type CustomAutoformatResolved = {
  action: 'resolved';
  matchString: string;
  replacement?: ProsemirrorNode;
};

export type CustomAutoformatFinish = {
  action: 'finish';
  matchString: string;
};

export type CustomAutoformatAction =
  | CustomAutoformatMatched
  | CustomAutoformatResolved
  | CustomAutoformatFinish;
