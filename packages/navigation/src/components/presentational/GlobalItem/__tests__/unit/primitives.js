// @flow

import { shallow } from 'enzyme';
import React from 'react';
import Tooltip from '@atlaskit/tooltip';
import GlobalNavigationItemPrimitive from '../../primitives';

const theme = {
  mode: {
    globalItem: Function.prototype,
  },
};
const styles = () => ({
  itemBase: {},
});

// Required to dive inside the withGlobalTheme HOC
const shallowDive = node => shallow(node).dive();

describe('GlobalNavigationItemPrimitive', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it('should be wrapped using withGlobalTheme HOC', () => {
    const WrappedWithGlobalTheme = () => null;
    const MockWithGlobalTheme = jest.fn(() => WrappedWithGlobalTheme);
    jest.doMock('../../../../../theme', () => ({
      withGlobalTheme: MockWithGlobalTheme,
      styleReducerNoOp: jest.fn(s => s),
    }));

    const { BaseGlobalNavigationItemPrimitive } = require('../../primitives');
    expect(MockWithGlobalTheme).toHaveBeenCalledWith(
      BaseGlobalNavigationItemPrimitive,
    );
  });

  it('should render an anchor when an href prop is passed', () => {
    const wrapper = shallowDive(
      <GlobalNavigationItemPrimitive
        styles={styles}
        theme={theme}
        href="www.example.com"
      />,
    );
    const anchor = wrapper.find('a[href="www.example.com"]');
    expect(anchor).toHaveLength(1);
    expect(anchor.props()).toEqual({
      children: null,
      className: expect.any(String),
      href: 'www.example.com',
    });

    expect(wrapper).toMatchSnapshot();
  });

  it('should render a button when an onClick prop is passed', () => {
    const wrapper = shallowDive(
      <GlobalNavigationItemPrimitive
        styles={styles}
        theme={theme}
        onClick={Function.prototype}
      />,
    );
    const button = wrapper.find('button');
    expect(button).toHaveLength(1);
    expect(button.props()).toEqual({
      children: null,
      className: expect.any(String),
      onClick: expect.any(Function),
    });

    expect(wrapper).toMatchSnapshot();
  });

  it('should render a CustomComponent when a component prop is passed', () => {
    const MyComponent = ({ className, children, onClick }: any) => (
      <button className={className} onClick={onClick} id="customComponent">
        {children}
      </button>
    );
    const onClick = () => {};
    const wrapper = shallowDive(
      <GlobalNavigationItemPrimitive
        component={MyComponent}
        label="my-label"
        id="my-id"
        onClick={onClick}
        styles={styles}
        theme={theme}
      />,
    );

    const componentEl = wrapper.find(MyComponent);
    expect(componentEl).toHaveLength(1);
    expect(componentEl.props()).toEqual({
      children: null,
      className: expect.any(String),
      component: MyComponent,
      id: 'my-id',
      label: 'my-label',
      onClick,
      size: 'large',
      styles,
    });

    expect(wrapper).toMatchSnapshot();
  });

  it('should render a span if neither an href, onClick or component prop is passed', () => {
    const wrapper = shallowDive(
      <GlobalNavigationItemPrimitive styles={styles} theme={theme} />,
    );
    const span = wrapper.find('span');
    expect(span).toHaveLength(1);
    expect(span.props()).toEqual({
      children: null,
      className: expect.any(String),
    });
  });

  it('should render badge and icon when badge and icon props are passed', () => {
    const MyBadge = () => <div id="badge" />;
    const MyIcon = () => <div id="icon" />;
    const wrapper = shallowDive(
      <GlobalNavigationItemPrimitive
        styles={styles}
        theme={theme}
        badge={MyBadge}
        icon={MyIcon}
        onClick={Function.prototype}
      />,
    );

    expect(wrapper.find(MyBadge)).toHaveLength(1);
    expect(wrapper.find(MyIcon)).toHaveLength(1);
  });

  it('should render a tooltip when a tooltip prop is passed', () => {
    const wrapper = shallowDive(
      <GlobalNavigationItemPrimitive
        component={({ className, children, onClick }) => (
          <button className={className} onClick={onClick} id="customComponent">
            {children}
          </button>
        )}
        styles={styles}
        theme={theme}
        tooltip="Test tooltip"
      />,
    );
    expect(wrapper.find(Tooltip).length).toBe(1);
  });

  it('should render a tooltip without text if element is selected', () => {
    const wrapper = shallowDive(
      <GlobalNavigationItemPrimitive
        component={() => <button id="customComponent" />}
        styles={styles}
        theme={theme}
        tooltip="Test tooltip"
        isSelected
      />,
    );
    expect(wrapper.find(Tooltip).props().content).toBe(undefined);
  });
});
