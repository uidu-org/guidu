// @flow

import React from 'react';
import { mount } from 'enzyme';
import Theme from '../../..';

test('no parent', done => {
  mount(
    <Theme.Consumer>
      {t => {
        expect(t).toEqual({ mode: 'light' });
        done();
      }}
    </Theme.Consumer>,
  );
});

test('has parent', done => {
  const backgroundColor = '#fff';
  const textColor = '#000';
  mount(
    <Theme.Provider value={t => ({ backgroundColor, ...t() })}>
      <Theme.Provider value={t => ({ ...t(), textColor })}>
        <Theme.Consumer>
          {t => {
            expect(t).toEqual({ backgroundColor, mode: 'light', textColor });
            done();
          }}
        </Theme.Consumer>
      </Theme.Provider>
    </Theme.Provider>,
  );
});
