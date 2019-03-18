jest.mock('react-lazily-render', () => {
  return {
    default: (data: any) => data.content,
  };
});

import * as React from 'react';
import { CardWithUrlContent } from '../../renderCardWithUrl';
import { mount } from 'enzyme';
import { Client, ResolveResponse } from '../../../Client';
import Button from '@uidu/button';
import {
  AnalyticsEventPayload,
  UIAnalyticsEventInterface,
} from '@atlaskit/analytics-next-types';
import { InlineCardUnauthorizedView } from '@uidu/media-ui';

class FakeClient extends Client {
  fetchData(): Promise<ResolveResponse> {
    return Promise.resolve({
      meta: {
        visibility: 'restricted' as any,
        access: 'unauthorized' as any,
        auth: [
          {
            key: 'string',
            displayName: 'string',
            url: 'string',
          },
        ],
        definitionId: 'd1',
      },
    });
  }
}

const Mock = {
  positiveAuthFn: () => Promise.resolve(),
  negativeAuthFn: () => Promise.reject(new Error('rejected auth')),
  winClosedAuthFn: () =>
    Promise.reject(new Error('The auth window was closed')),
  mockedFireFn: jest.fn(),
  fakeCreateAnalyticsEvent: jest.fn().mockImplementation(
    (payload: AnalyticsEventPayload): UIAnalyticsEventInterface => {
      return ({
        fire: Mock.mockedFireFn,
        payload,
      } as any) as UIAnalyticsEventInterface;
    },
  ),
};

const delay = (n: number) => new Promise(res => setTimeout(res, n));

describe('Render Card With URL', () => {
  afterEach(() => {
    Mock.fakeCreateAnalyticsEvent.mockClear();
  });

  it('should fire connectSucceeded event when auth suceeds', async () => {
    const fakeClient = new FakeClient({ loadingStateDelay: 0 });
    const wrapper = mount(
      <CardWithUrlContent
        url="http://some.url"
        client={fakeClient}
        appearance="inline"
        onClick={() => {}}
        isSelected={false}
        createAnalyticsEvent={Mock.fakeCreateAnalyticsEvent}
        authFn={Mock.positiveAuthFn}
      />,
    );
    // pending state for now...
    await delay(1); // wait for client to respond...
    wrapper.update();

    wrapper
      .find(InlineCardUnauthorizedView)
      .find(Button)
      .simulate('click');

    await delay(1); // wait for async auth mock...

    const calls = Mock.fakeCreateAnalyticsEvent.mock.calls.map(
      ([obj]) => obj.action,
    );

    expect(calls).toEqual(['unresolved', 'connected', 'connectSucceeded']);
  });

  it('should fire connectFailed event when auth fails', async () => {
    const fakeClient = new FakeClient({ loadingStateDelay: 0 });
    const wrapper = mount(
      <CardWithUrlContent
        url="http://some.url"
        client={fakeClient}
        appearance="inline"
        onClick={() => {}}
        isSelected={false}
        createAnalyticsEvent={Mock.fakeCreateAnalyticsEvent}
        authFn={Mock.negativeAuthFn}
      />,
    );
    // pending state for now...
    await delay(1); // wait for client to respond...
    wrapper.update();

    wrapper
      .find(InlineCardUnauthorizedView)
      .find(Button)
      .simulate('click');

    await delay(1); // wait for async auth mock...

    const calls = Mock.fakeCreateAnalyticsEvent.mock.calls.map(
      ([obj]) => obj.action,
    );

    expect(calls).toEqual(['unresolved', 'connectFailed']);
  });

  it('should track the reason for auth failure', async () => {
    const fakeClient = new FakeClient({ loadingStateDelay: 0 });
    const wrapper = mount(
      <CardWithUrlContent
        url="http://some.url"
        client={fakeClient}
        appearance="inline"
        onClick={() => {}}
        isSelected={false}
        createAnalyticsEvent={Mock.fakeCreateAnalyticsEvent}
        authFn={Mock.negativeAuthFn}
      />,
    );
    // pending state for now...
    await delay(1); // wait for client to respond...
    wrapper.update();

    wrapper
      .find(InlineCardUnauthorizedView)
      .find(Button)
      .simulate('click');

    await delay(1); // wait for async auth mock...

    const reasons = Mock.fakeCreateAnalyticsEvent.mock.calls.map(
      ([obj]) => obj.attributes.reason,
    );

    expect(reasons).toEqual(['unauthorized', 'potential.sensitive.data']);
  });

  it('should track when auth dialog was closed', async () => {
    const fakeClient = new FakeClient({ loadingStateDelay: 0 });
    const wrapper = mount(
      <CardWithUrlContent
        url="http://some.url"
        client={fakeClient}
        appearance="inline"
        onClick={() => {}}
        isSelected={false}
        createAnalyticsEvent={Mock.fakeCreateAnalyticsEvent}
        authFn={Mock.winClosedAuthFn}
      />,
    );
    // pending state for now...
    await delay(1); // wait for client to respond...
    wrapper.update();

    wrapper
      .find(InlineCardUnauthorizedView)
      .find(Button)
      .simulate('click');

    await delay(1); // wait for async auth mock...

    const reasons = Mock.fakeCreateAnalyticsEvent.mock.calls.map(
      ([obj]) => obj.attributes.reason,
    );

    expect(reasons).toEqual(['unauthorized', 'auth.window.was.closed']);
  });
});
