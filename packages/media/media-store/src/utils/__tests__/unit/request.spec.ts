import 'whatwg-fetch';
import * as fetchMock from 'fetch-mock';

import { request } from '../../request';

const throwExpectedToFail = () => {
  throw new Error(`Expected to fail, but resolved instead`);
};

describe('request', () => {
  const url = 'http://some-url';
  const clientId = 'some-client-id';
  const asapIssuer = 'some-asap-issuer';
  const token = 'some-token';
  const baseUrl = 'some-base-url';

  beforeEach(() => fetchMock.mock(`*`, {}));

  afterEach(() => fetchMock.restore());

  it('should call fetch with GET method given url only', () => {
    return request(url).then(() => {
      expect(fetchMock.lastUrl()).toEqual(url);
      expect(fetchMock.lastOptions()).toEqual({ method: 'GET' });
    });
  });

  it('should call fetch with auth query parameters given GET request and client based auth', () => {
    return request(url, {
      method: 'GET',
      auth: { clientId, token, baseUrl },
    }).then(() => {
      expect(fetchMock.lastUrl()).toEqual(
        `${url}?client=${clientId}&token=${token}`,
      );
      expect(fetchMock.lastOptions()).toEqual({ method: 'GET' });
    });
  });

  it('should call fetch with auth query parameters given GET request and asap based auth', () => {
    return request(url, {
      method: 'GET',
      auth: { asapIssuer, token, baseUrl },
    }).then(() => {
      expect(fetchMock.lastUrl()).toEqual(
        `${url}?issuer=${asapIssuer}&token=${token}`,
      );
      expect(fetchMock.lastOptions()).toEqual({ method: 'GET' });
    });
  });

  it('should call fetch with auth headers given POST request and client based auth', () => {
    return request(url, {
      method: 'POST',
      auth: { clientId, token, baseUrl },
    }).then(() => {
      expect(fetchMock.lastUrl()).toEqual(`${url}`);
      expect(fetchMock.lastOptions()).toEqual({
        method: 'POST',
        headers: {
          'X-Client-Id': clientId,
          Authorization: `Bearer ${token}`,
        },
      });
    });
  });

  it('should call fetch with auth headers given GET request and asap based auth', () => {
    return request(url, {
      method: 'POST',
      auth: { asapIssuer, token, baseUrl },
    }).then(() => {
      expect(fetchMock.lastUrl()).toEqual(`${url}`);
      expect(fetchMock.lastOptions()).toEqual({
        method: 'POST',
        headers: {
          'X-Issuer': asapIssuer,
          Authorization: `Bearer ${token}`,
        },
      });
    });
  });

  it('should fail if response is 400', () => {
    fetchMock.restore();
    fetchMock.mock('*', {
      status: 400,
      body: 'There was a problem',
    });
    return request(url).then(throwExpectedToFail, (response: Response) => {
      return response.text().then(responseText => {
        expect(responseText).toEqual('There was a problem');
      });
    });
  });

  it('should not fail if response is 300', () => {
    fetchMock.restore();
    fetchMock.mock('*', {
      status: 300,
      __redirectUrl: 'http://other-url',
    });
    return request(url);
  });
});
