export type Token = {
  id: string;
  name: string;
};

export type TokenProvider = {
  getItems: (query: string, selectedTokens: Token[]) => Promise<Array<Token>>;
};
