import { Auth, isClientBasedAuth } from '@uidu/media-core';
export { SourceFile } from '@uidu/media-store';

export type ClientBasedSourceFileOwner = {
  readonly id: string;
  readonly token: string;
  readonly baseUrl: string;
};

export type AsapBasedSourceFileOwner = {
  readonly asapIssuer: string;
  readonly token: string;
  readonly baseUrl: string;
};

export type SourceFileOwner =
  | ClientBasedSourceFileOwner
  | AsapBasedSourceFileOwner;

export function mapAuthToSourceFileOwner(auth: Auth): SourceFileOwner {
  if (isClientBasedAuth(auth)) {
    return {
      id: auth.clientId,
      token: auth.token,
      baseUrl: auth.baseUrl,
    };
  } else {
    return auth;
  }
}
