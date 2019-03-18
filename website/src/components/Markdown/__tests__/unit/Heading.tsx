import * as React from 'react';
import Heading from '../../Heading';
import { mount } from 'enzyme';
// A console error is thrown because 'h' + level is not recognized as a React component
test('children', () => {
  const wrapper1 = mount(<Heading level={0} />);
  const wrapper2 = mount(<Heading level={0}>testing content</Heading>);

  expect(wrapper1.text()).toBe('');
  expect(wrapper2.text()).toBe('testing content');
});

test('id', () => {
  const id = wrapper => wrapper.children(0).prop('id');
  const wrapper1 = mount(<Heading level={0}>test</Heading>);
  const wrapper2 = mount(<Heading level={0}>test some more</Heading>);
  const wrapper3 = mount(
    <Heading level={0}>way-cool @)(*U()#*$(#$U* heading</Heading>,
  );

  expect(id(wrapper1)).toBe('test');
  expect(id(wrapper2)).toBe('test-some-more');
  expect(id(wrapper3)).toBe('way-cool-u-u-heading');
});

test('anchor - hidden', () => {
  const wrapper = mount(<Heading level={0}>test content</Heading>);
  expect(wrapper.find('a')).toHaveLength(0);
});

test('anchor - show', () => {
  const wrapper = mount(<Heading level={0}>test content</Heading>);
  const heading = wrapper.children();

  heading.simulate('mouseenter');
  wrapper.update();

  const a = wrapper.find('a');
  expect(a.text()).toBe('#');
  expect(a.prop('href')).toBe(`#${heading.prop('id')}`);
});

test('anchor - hide', () => {
  const wrapper = mount(<Heading level={0} />);
  const heading = wrapper.children();

  heading.simulate('mouseenter');
  wrapper.update();

  expect(wrapper.find('a')).toHaveLength(1);

  heading.simulate('mouseleave');
  wrapper.update();

  expect(wrapper.find('a')).toHaveLength(0);
});
