import {
  isClientBasedAuth,
  isAsapBasedAuth,
  ClientBasedAuth,
  AsapBasedAuth,
} from '../../..';

describe('Auth', () => {
  const clientBasedAuth: ClientBasedAuth = {
    clientId: 'some-client-id',
    token: 'some-token',
    baseUrl: 'some-base-url',
  };

  const asapBasedAuth: AsapBasedAuth = {
    asapIssuer: 'some-asap-issuer',
    token: 'some-token',
    baseUrl: 'some-base-url',
  };

  describe('isClientBasedAuth', () => {
    it('should return true for client based auth', () => {
      expect(isClientBasedAuth(clientBasedAuth)).toEqual(true);
    });

    it('should return false for asap based auth', () => {
      expect(isClientBasedAuth(asapBasedAuth)).toEqual(false);
    });
  });

  describe('isAsapBasedAuth', () => {
    it('should return false for client based auth', () => {
      expect(isAsapBasedAuth(clientBasedAuth)).toEqual(false);
    });

    it('should return true for asap based auth', () => {
      expect(isAsapBasedAuth(asapBasedAuth)).toEqual(true);
    });
  });
});
