import { Token, TokenProvider } from '@uidu/editor-common/provider-factory';

export type TokenPluginState = {
  tokenProvider: TokenProvider;
  tokens: Token[];
};
