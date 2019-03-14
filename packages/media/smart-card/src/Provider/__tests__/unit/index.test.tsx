import * as React from 'react';
import { mount } from 'enzyme';
import { Client } from '../../../Client';
import { Provider } from '../..';
import Context from '../../../Context';

describe('Provider', () => {
  it('should inject the default client instance', () => {
    const render = jest.fn();
    const client = new Client();
    mount(
      <Provider client={client}>
        <Context.Consumer>{render}</Context.Consumer>
      </Provider>,
    );
    expect(render).toBeCalledWith(client);
  });

  it('should inject the custom client instance', () => {
    const render = jest.fn();
    const client = new Client();
    mount(
      <Provider client={client}>
        <Context.Consumer>{render}</Context.Consumer>
      </Provider>,
    );
    expect(render).toBeCalledWith(client);
  });
});
