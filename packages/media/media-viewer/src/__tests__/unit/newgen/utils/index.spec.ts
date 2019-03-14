import { Identifier } from '@uidu/media-core';
import {
  constructAuthTokenUrl,
  getSelectedIndex,
} from '../../../../newgen/utils';
import { createContext } from '../../_stubs';

const token = 'some-token';
const baseUrl = 'some-base-url';

describe('utils', () => {
  describe('constructAuthTokenUrl', () => {
    it('should add auth token and client query parameters to the url when auth is client based', async () => {
      const clientId = 'some-client-id';
      const authPromise = Promise.resolve({ token, clientId, baseUrl });
      const context = createContext({ authPromise });
      const url = await constructAuthTokenUrl(
        '/file/3333-4444-5555',
        context,
        'mycollection',
      );
      expect(url).toEqual(
        'some-base-url/file/3333-4444-5555?client=some-client-id&collection=mycollection&token=some-token',
      );
    });

    it('should work with urls with params', async () => {
      const clientId = 'some-client-id';
      const authPromise = Promise.resolve({ token, clientId, baseUrl });
      const context = createContext({ authPromise });
      const url = await constructAuthTokenUrl(
        '/file/3333-4444-5555?version=1',
        context,
        'mycollection',
      );
      expect(url).toEqual(
        'some-base-url/file/3333-4444-5555?version=1&client=some-client-id&collection=mycollection&token=some-token',
      );
    });

    it('should add the auth token to the url when auth type is ASAP', async () => {
      const issuer = 'some-issuer'; // issuer gets send through the headers, so it shouldn't show up in the url
      const authPromise = Promise.resolve({
        token,
        asapIssuer: issuer,
        baseUrl,
      });
      const context = createContext({ authPromise });
      const url = await constructAuthTokenUrl(
        '/file/3333-4444-5555',
        context,
        'mycollection',
      );
      expect(url).toEqual(
        'some-base-url/file/3333-4444-5555?collection=mycollection&issuer=some-issuer&token=some-token',
      );
    });
  });

  describe('getSelectedIndex', () => {
    it('should return the right index if item is found', () => {
      const identifier: Identifier = {
        id: 'some-id',
        occurrenceKey: 'some-custom-occurrence-key',
        mediaItemType: 'file',
      };
      const identifier2: Identifier = {
        id: 'some-id-2',
        occurrenceKey: 'some-custom-occurrence-key',
        mediaItemType: 'file',
      };

      const items = [identifier, identifier2];
      expect(getSelectedIndex(items, identifier)).toEqual(0);
    });

    it('should return -1 if item is not found', () => {
      const identifier: Identifier = {
        id: 'some-id',
        occurrenceKey: 'some-custom-occurrence-key',
        mediaItemType: 'file',
      };
      const identifier2: Identifier = {
        id: 'some-id-2',
        occurrenceKey: 'some-custom-occurrence-key',
        mediaItemType: 'file',
      };
      const notFoundIdentifier: Identifier = {
        id: 'some-id-not-found',
        occurrenceKey: 'some-custom-occurrence-key',
        mediaItemType: 'file',
      };

      const items = [identifier, identifier2];
      expect(getSelectedIndex(items, notFoundIdentifier)).toEqual(-1);
    });
  });
});
