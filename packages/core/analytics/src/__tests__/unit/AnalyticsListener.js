// @flow

import React from 'react';
import { mount, shallow } from 'enzyme';
import PropTypes from 'prop-types';
import { AnalyticsListener } from '../..';

const ContextConsumer = (
  props: { onClick: (handlers: {}) => void },
  context,
) => {
  const onClick = () => {
    const eventHandlers = context.getAtlaskitAnalyticsEventHandlers();
    props.onClick(eventHandlers);
  };
  return <button onClick={onClick} />;
};
ContextConsumer.contextTypes = {
  getAtlaskitAnalyticsEventHandlers: PropTypes.func,
};

it('should render', () => {
  const wrapper = shallow(
    <AnalyticsListener onEvent={() => {}}>
      <div />
    </AnalyticsListener>,
  );

  expect(wrapper.find('div')).toHaveLength(1);
});

it('should expose onEvent prop callback via getAtlaskitAnalyticsEventHandlers react context callback', () => {
  let analyticsEventHandlers;
  const eventHandler = jest.fn();
  const getHandlers = handlers => {
    analyticsEventHandlers = handlers;
  };
  const wrapper = mount(
    <AnalyticsListener onEvent={eventHandler}>
      <ContextConsumer onClick={getHandlers} />
    </AnalyticsListener>,
  );
  wrapper.find(ContextConsumer).simulate('click');

  expect(analyticsEventHandlers).toEqual(expect.anything());
  if (analyticsEventHandlers) {
    expect(analyticsEventHandlers.length).toBe(1);
    analyticsEventHandlers[0]();
  }
  expect(eventHandler).toHaveBeenCalled();
});

it('should add ancestor analytics event handlers to getAtlaskitAnalyticsEventHandlers react context callback', () => {
  let analyticsEventHandlers;
  const innerHandler = jest.fn();
  const outerHandler = jest.fn();
  const getHandlers = handlers => {
    analyticsEventHandlers = handlers;
  };
  const wrapper = mount(
    <AnalyticsListener onEvent={outerHandler}>
      <AnalyticsListener onEvent={innerHandler}>
        <ContextConsumer onClick={getHandlers} />
      </AnalyticsListener>
    </AnalyticsListener>,
  );
  wrapper.find(ContextConsumer).simulate('click');

  expect(analyticsEventHandlers).toEqual(expect.anything());
  if (analyticsEventHandlers) {
    expect(analyticsEventHandlers.length).toBe(2);
    analyticsEventHandlers[0]();
    analyticsEventHandlers[1]();
  }
  expect(innerHandler).toHaveBeenCalled();
  expect(outerHandler).toHaveBeenCalled();
});

it('should support many children', () => {
  const onEvent = jest.fn();
  const wrapper = mount(
    <AnalyticsListener onEvent={onEvent}>
      <ContextConsumer onClick={([handler]) => handler()} />
      <ContextConsumer onClick={([handler]) => handler()} />
    </AnalyticsListener>,
  );
  wrapper.find(ContextConsumer).forEach(consumer => consumer.simulate('click'));
  expect(onEvent).toHaveBeenCalledTimes(2);
});

// TODO: Add channel stuff once listener swallow branch has been merged
