import 'whatwg-fetch';
import 'abortcontroller-polyfill/dist/polyfill-patch-fetch';
import * as fetchMock from 'fetch-mock';
import { Client, RemoteResourceAuthConfig, ResolveResponse } from '../..';
import { ObjectState, GetNowTimeFn, DefinedState } from '../../types';
import { v4 } from 'uuid';
import { resolvedEvent, unresolvedEvent } from '../../../analytics';
import env from '../../../environments';

const getNow = (nows: number[]): GetNowTimeFn => () =>
  nows.shift() || new Date().getTime();

const waitFor = (n: number = 1) => new Promise(res => setTimeout(res, n));

const RESOLVE_URL = 'https://api-private.atlassian.com/object-resolver/resolve';

const OBJECT_URL = 'http://example.com/foobar';

const remoteResourceMetaAuth: RemoteResourceAuthConfig[] = [];

const definitionId = 'abc-123';

const generator = {
  name: 'My App',
};

function mockResolvedFetchCall() {
  fetchMock.mock({
    name: 'resolved',
    matcher: `begin:${RESOLVE_URL}`,
    response: {
      status: 200,
      body: JSON.stringify({
        meta: {
          visibility: 'restricted',
          access: 'granted',
          auth: remoteResourceMetaAuth,
          definitionId,
        },
        data: {
          '@context': {},
          name: 'My Page',
          generator,
        },
      }),
    },
  });
}

function mockUnauthorizedFetchCall() {
  fetchMock.mock({
    matcher: `begin:${RESOLVE_URL}`,
    response: {
      status: 200,
      body: JSON.stringify({
        meta: {
          visibility: 'restricted',
          access: 'unauthorized',
          auth: remoteResourceMetaAuth,
          definitionId,
        },
        data: {
          '@context': {},
          generator,
        },
      }),
    },
  });
}

function mockRestrictedFetchCall() {
  fetchMock.mock({
    matcher: `begin:${RESOLVE_URL}`,
    response: {
      status: 200,
      body: JSON.stringify({
        meta: {
          visibility: 'restricted',
          access: 'forbidden',
          auth: remoteResourceMetaAuth,
          definitionId,
        },
        data: {
          '@context': {},
          generator,
        },
      }),
    },
  });
}

function mockErroredFetchCall() {
  fetchMock.mock({
    name: 'errored',
    matcher: `begin:${RESOLVE_URL}`,
    response: {
      status: 500,
      throws: 'Errored mock',
    },
  });
}

function mockNotFoundFetchCall() {
  fetchMock.mock({
    name: 'notfound',
    matcher: `begin:${RESOLVE_URL}`,
    response: {
      status: 200,
      body: JSON.stringify({
        meta: {
          visibility: 'not_found',
          access: 'granted',
          auth: remoteResourceMetaAuth,
          definitionId,
        },
      }),
    },
  });
}

function onNthState(
  cb: (x: any) => any,
  n: number,
): (s: [ObjectState | null, boolean]) => void {
  let stack: (ObjectState | null)[] = [];
  return (s: [ObjectState | null, boolean]) => {
    stack.push(s[0]);
    if (stack.length === n) {
      cb(stack);
    }
  };
}

describe('Client', () => {
  afterEach(() => fetchMock.restore());

  describe('environments', () => {
    it('should make a call to prod server if not other env is specified', async () => {
      expect(new Client().env.resolverURL).toEqual(env.prod.resolverURL);
    });

    it('should make a call to prod server if not other env is specified', () => {
      expect(new Client(undefined, 'dev').env.resolverURL).toEqual(
        env.dev.resolverURL,
      );
    });

    it('should make a call to prod server if not other env is specified', () => {
      expect(new Client(undefined, 'staging').env.resolverURL).toEqual(
        env.staging.resolverURL,
      );
    });
  });

  it('should call update function two times', async () => {
    mockResolvedFetchCall();

    const client = new Client();

    let stack: (ObjectState | null)[] = [];

    const result = await new Promise(resolve => {
      const mockCardUpdateFunction = (s: [ObjectState | null, boolean]) => {
        const [state] = s;
        stack.push(state);
        if (stack.length === 2) {
          resolve(stack);
        }
      };
      client.register(OBJECT_URL).subscribe(v4(), mockCardUpdateFunction);
      client.resolve(OBJECT_URL);
    });

    expect(result).toMatchObject([
      null,
      { status: 'resolved', definitionId: definitionId },
    ]);
  });

  it('should invoke different callbacks for the same URL', async () => {
    mockResolvedFetchCall();

    const result = await new Promise<any[]>(resolve => {
      const client = new Client();

      let stack: (ObjectState | null)[] = [];

      const theUrl = 'TEST.COM/test-case-123';

      const card1 = {
        url: theUrl,
        uuid: v4(),
        update: (state: [ObjectState | null, boolean]) => {
          stack.push(state[0]);
        },
      };
      const card2 = {
        url: theUrl,
        uuid: v4(),
        update: (state: [ObjectState | null, boolean]) => {
          stack.push(state[0]);
          if (stack.length === 4) {
            return resolve(stack);
          }
        },
      };

      client.register(card1.url).subscribe(card1.uuid, card1.update);
      client.resolve(card1.url);

      client.register(card2.url).subscribe(card2.uuid, card2.update);
      client.resolve(card2.url);
    });

    expect(result.length).toEqual(6);

    expect(result).toMatchObject([
      null,
      null,
      { status: 'resolved', definitionId },
      { status: 'resolved', definitionId },
      { status: 'resolved', definitionId },
      { status: 'resolved', definitionId },
    ]);
  });

  it('should be not-found when the object cannot be found', async () => {
    mockNotFoundFetchCall();

    const result = await new Promise(resolve => {
      const mockCardUpdateFunction = onNthState(resolve, 2);
      const uuid = v4();
      const client = new Client();
      client.register(OBJECT_URL).subscribe(uuid, mockCardUpdateFunction);
      client.resolve(OBJECT_URL);
    });

    expect(result).toMatchObject([null, { status: 'not-found' }]);
  });

  it('should be unauthorized when the object cannot be accessed by the current user', async () => {
    mockUnauthorizedFetchCall();

    const result = await new Promise<ObjectState[]>(resolve => {
      const mockCardUpdateFunction = onNthState(resolve, 2);
      const uuid = v4();
      const client = new Client();
      client.register(OBJECT_URL).subscribe(uuid, mockCardUpdateFunction);
      client.resolve(OBJECT_URL);
    });
    const actualResult = result[1] as DefinedState;
    expect(actualResult.status).toEqual('unauthorized');
    expect(actualResult.services).toEqual([]);
    expect(actualResult.data).toEqual({
      '@context': {},
      generator,
    });
  });

  it('should be forbidden when the object cannot be accessed by the current user', async () => {
    mockRestrictedFetchCall();

    const result = await new Promise<ObjectState[]>(resolve => {
      const mockCardUpdateFunction = onNthState(resolve, 2);
      const uuid = v4();
      const client = new Client();
      client.register(OBJECT_URL).subscribe(uuid, mockCardUpdateFunction);
      client.resolve(OBJECT_URL);
    });
    const actualResult = result[1] as DefinedState;
    expect(actualResult.status).toEqual('forbidden');
    expect(actualResult.services).toEqual([]);
    expect(actualResult.data).toEqual({
      '@context': {},
      generator,
    });
  });

  it('should be errored when the object cannot be retrieved', async () => {
    mockErroredFetchCall();

    const result = await new Promise<ObjectState[]>(resolve => {
      const mockCardUpdateFunction = onNthState(resolve, 2);
      const uuid = v4();
      const client = new Client();
      client.register(OBJECT_URL).subscribe(uuid, mockCardUpdateFunction);
      client.resolve(OBJECT_URL);
    });
    const actualResult = result[1] as DefinedState;
    expect(actualResult.status).toEqual('errored');
    expect(actualResult.services).toBeUndefined();
    expect(actualResult.data).toBeUndefined();
  });

  it('should be possible to extend the functionality of the default client', async () => {
    mockResolvedFetchCall();

    const specialCaseUrl = 'http://some.jira.com/board/ISS-1234';

    const customResponse = {
      meta: {
        visibility: 'public',
        access: 'granted',
        auth: [],
        definitionId: 'custom-def',
      },
      data: {
        name: 'Doc 1',
      },
    } as ResolveResponse;

    const callHistory = await new Promise<(ObjectState | null)[]>(resolve => {
      class CustomClient extends Client {
        fetchData(url: string) {
          if (url === specialCaseUrl) {
            return Promise.resolve(customResponse);
          }
          return super.fetchData(url);
        }
      }
      const customClient = new CustomClient({
        cacheLifespan: 1,
        getNowTimeFn: getNow([1, 2, 3]),
      });
      const stack: (ObjectState | null)[] = [];

      const specialCardUUID = v4();
      const callbackForSpecialCase = (s: [ObjectState | null, boolean]) => {
        stack.push(s[0]);
      };

      const normalCardUUID = v4();
      const callbackForNormalCase = (s: [ObjectState | null, boolean]) => {
        stack.push(s[0]);
        if (stack.length === 4) {
          resolve(stack);
        }
      };

      customClient
        .register(specialCaseUrl)
        .subscribe(specialCardUUID, callbackForSpecialCase);
      customClient
        .register(OBJECT_URL)
        .subscribe(normalCardUUID, callbackForNormalCase);

      customClient.resolve(specialCaseUrl);
      customClient.resolve(OBJECT_URL);
    });

    expect(callHistory).toMatchObject([
      null,
      null,
      {
        status: 'resolved',
        definitionId: 'custom-def',
        data: { name: 'Doc 1' },
      },
      { status: 'resolved', definitionId },
    ]);
  });

  it('should not reload resolved card with the same definition id', async () => {
    mockResolvedFetchCall();

    const card1: any = {
      url: 'http://drive.google.com/doc/1',
      uuid: v4(),
      definitionId: undefined,
      updateFn: jest
        .fn()
        .mockImplementation((data: [ObjectState | null, boolean]) => {
          if (data[0] === null || data[1]) {
            return client.resolve(card1.url);
          }
        }),
    };

    const card2: any = {
      url: 'http://drive.google.com/doc/1',
      uuid: v4(),
      definitionId: undefined,
      updateFn: jest
        .fn()
        .mockImplementation((data: [ObjectState | null, boolean]) => {
          if (data[0] === null || data[1]) {
            return client.resolve(card2.url);
          }
        }),
    };

    const customFetchMock = jest.fn().mockImplementation((url: string) => {
      if (url === card1.url) {
        return Promise.resolve(<ResolveResponse>{
          meta: {
            visibility: 'public',
            access: 'granted',
            auth: [],
            definitionId: 'google',
          },
          data: {
            name: 'Doc for Card 1',
          },
        });
      }
      return Promise.resolve(<ResolveResponse>{
        meta: {
          visibility: 'public',
          access: 'granted',
          auth: [],
          definitionId: 'google',
        },
        data: {
          name: 'Doc for Card 2',
        },
      });
    });

    class CustomClient extends Client {
      fetchData(url: string): Promise<ResolveResponse> {
        return customFetchMock(url);
      }
    }

    const client = new CustomClient({
      cacheLifespan: 3,
      getNowTimeFn: getNow([1, 10]),
    });

    client.register(card1.url).subscribe(card1.uuid, card1.updateFn);
    await waitFor(1);
    client.register(card2.url).subscribe(card2.uuid, card2.updateFn);
    await waitFor(1);

    expect(customFetchMock.mock.calls).toEqual([[card1.url], [card2.url]]);

    expect(card1.updateFn).toHaveBeenCalledTimes(3);
    expect(card2.updateFn).toHaveBeenCalledTimes(2);
  });

  it('should not reload card that has already been resolved and not expired', async () => {
    mockResolvedFetchCall();

    const theUrl = 'http://drive.google.com/doc/1';

    const card1: any = {
      url: theUrl,
      uuid: v4(),
      definitionId: undefined,
      updateFn: jest
        .fn()
        .mockImplementation((data: [ObjectState | null, boolean]) => {
          if (data[0] === null || data[1]) {
            return client.resolve(card1.url);
          }
        }),
    };

    const card2: any = {
      url: theUrl,
      uuid: v4(),
      definitionId: undefined,
      updateFn: jest
        .fn()
        .mockImplementation((data: [ObjectState | null, boolean]) => {
          if (data[0] === null || data[1]) {
            return client.resolve(card2.url);
          }
        }),
    };

    const customFetchMock = jest.fn().mockImplementation(() => {
      return Promise.resolve(<ResolveResponse>{
        meta: {
          visibility: 'public',
          access: 'granted',
          auth: [],
          definitionId: 'google',
        },
        data: {
          name: 'Doc for Card 1',
        },
      });
    });

    class CustomClient extends Client {
      fetchData(url: string): Promise<ResolveResponse> {
        return customFetchMock(url);
      }
    }

    const client = new CustomClient({
      cacheLifespan: 1,
      getNowTimeFn: getNow([1, 2]),
    });

    // First url has been pasted and a card has been added

    client.register(card1.url).subscribe(card1.uuid, card1.updateFn);

    await new Promise(res => window.setTimeout(res, 1));

    expect(customFetchMock.mock.calls).toEqual([[theUrl]]);

    expect(card1.updateFn).toHaveBeenCalledTimes(2);
    expect(card2.updateFn).toHaveBeenCalledTimes(0);

    // The same url has been pasted and another card has been added

    client.register(card2.url).subscribe(card2.uuid, card2.updateFn);

    await new Promise(res => window.setTimeout(res, 1));

    expect(customFetchMock.mock.calls).toEqual([[theUrl]]);

    expect(card1.updateFn).toHaveBeenCalledTimes(2);
    expect(card2.updateFn).toHaveBeenCalledTimes(1);
  });

  it('should show the resolve state when resolving takes longer than specified delay', async () => {
    // mockUnauthorizedFetchCall();

    const DELAY = 2;

    class CustomClient extends Client {
      fetchData() {
        return new Promise<ResolveResponse>(res => {
          setTimeout(res, DELAY, {
            meta: {
              visibility: 'restricted',
              access: 'unauthorized',
              auth: remoteResourceMetaAuth,
              definitionId,
            },
            data: {
              '@context': {},
              generator,
            },
          });
        });
      }
    }

    const client = new CustomClient({
      loadingStateDelay: 1,
    });

    const url = 'http://some.url';
    const updateFn = jest.fn();
    const uuid = v4();

    client.register(url).subscribe(uuid, updateFn);

    await waitFor(4);

    expect(updateFn).toBeCalledWith([null, true]);
  });

  describe('Analytics', () => {
    it('should accept a callback to handle an analytics event', done => {
      mockResolvedFetchCall();
      const client = new Client();
      const mockedHandler = jest.fn().mockImplementation(() => {
        expect(mockedHandler).toBeCalledTimes(1);
        done();
      });
      client.register('some.url');
      client.resolve('some.url', mockedHandler);
    });

    it('should fire a resolved event when a url gets resolved', done => {
      mockResolvedFetchCall();
      const client = new Client();
      const expectedEvent = resolvedEvent('some.url');
      const mockedHandler = jest.fn().mockImplementation(() => {
        expect(mockedHandler).toBeCalledWith(expectedEvent);
        done();
      });
      client.register('some.url');
      client.resolve('some.url', mockedHandler);
    });

    it('should fire an unresolved analytics event otherwise', done => {
      mockNotFoundFetchCall();
      const client = new Client();
      const expectedEvent = unresolvedEvent('some.url', {
        status: 'not-found',
      });
      const mockedHandler = jest.fn().mockImplementation(() => {
        expect(mockedHandler).toBeCalledWith(expectedEvent);
        done();
      });
      client.register('some.url');
      client.resolve('some.url', mockedHandler);
    });
  });
});
