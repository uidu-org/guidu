// @flow

import React from 'react';
import { mount, shallow } from 'enzyme';
import ArrowLeft from '@atlaskit/icon/glyph/arrow-left';

import DrawerPrimitive from '../../primitives';
import { Slide } from '../../transitions';

const DrawerContent = () => <code>Drawer contents</code>;

describe('Drawer primitive', () => {
  const commonProps = {
    width: 'wide',
    in: true,
    shouldUnmountOnExit: false,
  };

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should render given icon in large size if exists', () => {
    const props = { ...commonProps, icon: () => <span>Icon</span> };
    const wrapper = mount(
      <DrawerPrimitive {...props}>
        <DrawerContent />
      </DrawerPrimitive>,
    );
    expect(wrapper.find(props.icon).props().size).toBe('large');
  });

  it('should render arrow left if icon prop does NOT exist', () => {
    const props = { ...commonProps };
    const wrapper = mount(
      <DrawerPrimitive {...props}>
        <DrawerContent />
      </DrawerPrimitive>,
    );

    expect(wrapper.find(ArrowLeft).length).toBe(1);
  });

  it('should remount the node if receives shouldUnmountOnExit prop', () => {
    const props = { ...commonProps, shouldUnmountOnExit: true };
    const wrapper = mount(
      <DrawerPrimitive {...props}>
        <DrawerContent />
      </DrawerPrimitive>,
    );
    expect(wrapper.getDOMNode()).not.toBe(null);

    wrapper.setProps({ in: false });
    jest.runTimersToTime(20000);
    wrapper.update();

    expect(wrapper.getDOMNode()).toBe(null);
  });

  it('should NOT remount the node if shouldUnmountOnExit is false', () => {
    const props = { ...commonProps };
    const wrapper = mount(
      <DrawerPrimitive {...props}>
        <DrawerContent />
      </DrawerPrimitive>,
    );
    expect(wrapper.getDOMNode()).not.toBe(null);

    wrapper.setProps({ in: false });
    jest.runTimersToTime(20000);
    wrapper.update();

    expect(wrapper.getDOMNode()).not.toBe(null);
  });

  it('should render with medium width', () => {
    const props = { ...commonProps, width: 'medium' };
    const wrapper = mount(
      <DrawerPrimitive {...props}>
        <DrawerContent />
      </DrawerPrimitive>,
    );
    expect(wrapper.find(DrawerPrimitive).props().width).toBe('medium');
  });

  it('should call onClose when the icon is clicked', () => {
    const onClose = jest.fn();
    const props = { ...commonProps, onClose };
    const wrapper = shallow(
      <DrawerPrimitive {...props}>
        <DrawerContent />
      </DrawerPrimitive>,
    );

    const event = { target: 'button' };
    const callsBeforeIconClick = [].concat(onClose.mock.calls);
    wrapper.find('IconWrapper').prop('onClick')(event);
    const callsAfterIconClick = onClose.mock.calls;

    expect({ callsBeforeIconClick, callsAfterIconClick }).toEqual({
      callsBeforeIconClick: [],
      callsAfterIconClick: [[event]],
    });
  });

  it('should call onCloseComplete when the Slide has exited', () => {
    const onCloseComplete = jest.fn();
    const props = { ...commonProps, in: true, onCloseComplete };
    const wrapper = shallow(
      <DrawerPrimitive {...props}>
        <DrawerContent />
      </DrawerPrimitive>,
    );

    const node = 'div';
    const callsBeforeExited = [].concat(onCloseComplete.mock.calls);
    wrapper
      .find(Slide)
      .props()
      .onExited(node);
    const callsAfterExited = onCloseComplete.mock.calls;

    expect({
      callsBeforeExited,
      callsAfterExited,
    }).toEqual({
      callsBeforeExited: [],
      callsAfterExited: [[node]],
    });
  });
});
