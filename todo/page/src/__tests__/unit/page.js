// @flow
import { shallow } from 'enzyme';
import React from 'react';

import Page from '../..';
import { name } from '../../../package.json';

describe(name, () => {
  it('page should accept navigation as a property', () => {
    const Navigation = () => <span>Navigation</span>;
    expect(
      shallow(<Page navigation={<Navigation />} />).find(Navigation).length,
    ).toBe(1);
  });
});
