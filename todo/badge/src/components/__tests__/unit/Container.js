// @flow

import { shallow } from 'enzyme';
import React from 'react';
import { Container } from '../../Container';

test('snapshot', () => {
  expect(shallow(<Container />)).toMatchSnapshot();
});
