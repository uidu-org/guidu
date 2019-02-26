// @flow

import { mount } from 'enzyme';
import React from 'react';
import { createTheme } from '../createTheme';

test('component as a consumer', done => {
  const Theme = createTheme(() => ({ test: true }));
  mount(
    <Theme.Consumer>
      {tokens => {
        expect(tokens.test).toBe(true);
        done();
      }}
    </Theme.Consumer>,
  );
});

test('component as a provider (uses composition)', done => {
  const Theme = createTheme(() => ({
    test1: true,
    test2: false,
  }));
  mount(
    <Theme.Provider value={theme => ({ ...theme(), test2: true })}>
      <Theme.Consumer>
        {tokens => {
          expect(tokens.test1).toBe(true);
          expect(tokens.test2).toBe(true);
          done();
        }}
      </Theme.Consumer>
    </Theme.Provider>,
  );
});

test('cascade order', done => {
  const expectedProps = { test: true };
  const Theme = createTheme(props => {
    expect(props).toEqual(expectedProps);
    return { default: true };
  });
  const context = (themeDefault, props) => {
    expect(props).toEqual(expectedProps);
    expect(themeDefault(props)).toEqual({ default: true });
    return { context: true };
  };
  const supplied = (themeContext, props) => {
    expect(props).toEqual(expectedProps);
    expect(themeContext(props)).toEqual({ default: undefined, context: true });
    return { supplied: true };
  };
  mount(
    <Theme.Provider value={context}>
      <Theme.Provider value={supplied}>
        <Theme.Consumer test>
          {tokens => {
            expect(tokens).toEqual({
              default: undefined,
              context: undefined,
              supplied: true,
            });
            done();
          }}
        </Theme.Consumer>
      </Theme.Provider>
    </Theme.Provider>,
  );
});
