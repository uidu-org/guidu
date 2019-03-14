type TransitionStatus = 'entering' | 'entered' | 'exiting' | 'exited';

declare module 'react-transition-group/Transition' {
  // an extra function used by the tests for configuring mocks
  function __setStatus__(status: any): void;
}

jest.mock('react-transition-group/Transition', () => {
  let status: TransitionStatus = 'exited';
  return {
    __setStatus__: (s: TransitionStatus) => (status = s),
    default: ({
      children,
    }: {
      children: (status: TransitionStatus) => React.ReactNode;
    }) => children(status),
  };
});

import * as React from 'react';
import { mount } from 'enzyme';
import Transition from '../../Transition';
import { __setStatus__ } from 'react-transition-group/Transition';

const ExampleComponent = () => null;

describe('Transition', () => {
  it('should render the next children when transitioning from null', () => {
    const children = <ExampleComponent />;
    const wrapper = mount(<Transition timeout={2000}>{null}</Transition>);
    expect(wrapper.children().children()).toHaveLength(0);
    wrapper.setProps({ children });
    expect(wrapper.children().children()).toHaveLength(1);
  });

  it('should render the prev children when transitioning to null', () => {
    const children = <ExampleComponent />;
    const wrapper = mount(<Transition timeout={2000}>{children}</Transition>);
    expect(wrapper.children().children()).toHaveLength(1);
    wrapper.setProps({ children: null });
    expect(wrapper.children().children()).toHaveLength(1);
  });

  it('should render null when finished transitioning to null', () => {
    jest.useFakeTimers();
    const children = <ExampleComponent />;
    const wrapper = mount(<Transition timeout={2000}>{children}</Transition>);
    wrapper.setProps({ children: null });
    wrapper
      .children()
      .first()
      .prop('onExited')();
    jest.runAllTimers();
    wrapper.update();
    expect(wrapper.children().children()).toHaveLength(0);
  });

  it('should render transition when entered', () => {
    __setStatus__('entered');
    const wrapper = mount(
      <Transition timeout={2000}>
        <ExampleComponent />
      </Transition>,
    );
    expect(wrapper.find(ExampleComponent).prop('style')).toEqual(
      expect.objectContaining({
        transition: 'all 2000ms ease-in-out',
      }),
    );
  });

  it('should render transition when exited', () => {
    __setStatus__('exited');
    const wrapper = mount(
      <Transition timeout={2000}>
        <ExampleComponent />
      </Transition>,
    );
    expect(wrapper.find(ExampleComponent).prop('style')).toEqual(
      expect.objectContaining({
        transition: 'all 2000ms ease-in-out',
      }),
    );
  });

  it('should render fade styles when entering', () => {
    __setStatus__('entering');
    const wrapper = mount(
      <Transition enter={['fade']} timeout={2000}>
        <ExampleComponent />
      </Transition>,
    );
    expect(wrapper.find(ExampleComponent).prop('style')).toEqual(
      expect.objectContaining({
        opacity: '0',
      }),
    );
  });

  it('should render fade styles when entered', () => {
    __setStatus__('entered');
    const wrapper = mount(
      <Transition enter={['fade']} timeout={2000}>
        <ExampleComponent />
      </Transition>,
    );
    expect(wrapper.find(ExampleComponent).prop('style')).toEqual(
      expect.objectContaining({
        opacity: '1',
      }),
    );
  });

  it('should render fade styles when exiting', () => {
    __setStatus__('exiting');
    const wrapper = mount(
      <Transition exit={['fade']} timeout={2000}>
        <ExampleComponent />
      </Transition>,
    );
    expect(wrapper.find(ExampleComponent).prop('style')).toEqual(
      expect.objectContaining({
        opacity: '1',
      }),
    );
  });

  it('should render fade styles when exited', () => {
    __setStatus__('exited');
    const wrapper = mount(
      <Transition exit={['fade']} timeout={2000}>
        <ExampleComponent />
      </Transition>,
    );
    expect(wrapper.find(ExampleComponent).prop('style')).toEqual(
      expect.objectContaining({
        opacity: '0',
      }),
    );
  });

  it('should render slide-up styles when entering', () => {
    __setStatus__('entering');
    const wrapper = mount(
      <Transition enter={['slide-up']} timeout={2000}>
        <ExampleComponent />
      </Transition>,
    );
    expect(wrapper.find(ExampleComponent).prop('style')).toEqual(
      expect.objectContaining({
        transform: 'translate(0, 100%)',
      }),
    );
  });

  it('should render slide-up styles when entered', () => {
    __setStatus__('entered');
    const wrapper = mount(
      <Transition enter={['slide-up']} timeout={2000}>
        <ExampleComponent />
      </Transition>,
    );
    expect(wrapper.find(ExampleComponent).prop('style')).toEqual(
      expect.objectContaining({
        transform: 'translate(0, 0)',
      }),
    );
  });

  it('should render slide-down styles when exiting', () => {
    __setStatus__('exiting');
    const wrapper = mount(
      <Transition exit={['slide-down']} timeout={2000}>
        <ExampleComponent />
      </Transition>,
    );
    expect(wrapper.find(ExampleComponent).prop('style')).toEqual(
      expect.objectContaining({
        transform: 'translate(0, 0)',
      }),
    );
  });

  it('should render slide-down styles when exited', () => {
    __setStatus__('exited');
    const wrapper = mount(
      <Transition exit={['slide-down']} timeout={2000}>
        <ExampleComponent />
      </Transition>,
    );
    expect(wrapper.find(ExampleComponent).prop('style')).toEqual(
      expect.objectContaining({
        transform: 'translate(0, 100%)',
      }),
    );
  });
});
