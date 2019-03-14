import { StoryBookAuthProvider } from './authProvider';
import { collectionNames } from './collectionNames';
import { ContextFactory, Context } from '@uidu/media-core';
import { mediaPickerAuthProvider } from './mediaPickerAuthProvider';
import { userAuthProvider } from './userAuthProvider';

export const defaultBaseUrl = 'https://dt-api.dev.atl-paas.net';

export const defaultParams = {
  clientId: '5a9812fc-d029-4a39-8a46-d3cc36eed7ab',
  asapIssuer: 'micros/media-playground',
  baseUrl: defaultBaseUrl,
};

export interface AuthParameter {
  authType: 'client' | 'asap';
}

const defaultAuthParameter: AuthParameter = {
  authType: 'client',
};

/**
 * Creates and returns `Context` (from `media-core`) based on the data provided in parameter object.
 *
 * @param {AuthParameter} authParameter specifies serviceName and whatever auth should be done with clientId or asapIssuer
 * @returns {Context}
 */
export const createStorybookContext = (
  authParameter: AuthParameter = defaultAuthParameter,
): Context => {
  const scopes: { [resource: string]: string[] } = {
    'urn:filestore:file:*': ['read'],
    'urn:filestore:chunk:*': ['read'],
  };
  collectionNames.forEach(c => {
    scopes[`urn:filestore:collection:${c}`] = ['read', 'update'];
  });

  const isAsapEnvironment = authParameter.authType === 'asap';
  const authProvider = StoryBookAuthProvider.create(isAsapEnvironment, scopes);

  return ContextFactory.create({
    authProvider,
  });
};

export const createUploadContext = (): Context =>
  ContextFactory.create({
    authProvider: mediaPickerAuthProvider('asap'),
    userAuthProvider,
  });
