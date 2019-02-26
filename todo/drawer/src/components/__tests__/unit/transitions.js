// @flow
import React from 'react';
import { mount } from 'enzyme';

import { Fade, Slide } from '../../transitions';

describe('Drawer Transitions', () => {
  describe('Slide', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = mount(<Slide in test="some-test-data" />);
    });

    it('should use the default styles to start the animation', () => {
      const { defaultStyles } = wrapper.find('TransitionHandler').props();

      expect(defaultStyles).toMatchObject({
        transition:
          'transform 220ms cubic-bezier(0.2, 0, 0, 1), width 220ms cubic-bezier(0.2, 0, 0, 1)',
        transform: 'translate3d(-100%,0,0)',
      });
    });

    it('should add the other element props', () => {
      const { ...otherProps } = wrapper.find('TransitionHandler').props();
      expect(otherProps).toMatchObject({ test: 'some-test-data' });
    });

    it('should use the transition styles', () => {
      const { transitionStyles } = wrapper.find('TransitionHandler').props();

      expect(transitionStyles).toMatchObject({
        entered: { transform: null },
        exited: { transform: 'translate3d(-100%,0,0)' },
      });
    });

    it('should set "unmountOnExit" to true as default', () => {
      const { unmountOnExit } = wrapper.find('Transition').props();

      expect(unmountOnExit).toBeTruthy();
    });

    it('should update "unmountOnExit"', () => {
      const { unmountOnExit } = mount(<Slide in shouldUnmountOnExit={false} />);

      expect(unmountOnExit).toBeFalsy();
    });

    it('should pass onExited to the Transition', () => {
      const onExited = jest.fn();
      const slide = mount(<Slide in onExited={onExited} />);

      expect(slide.find('Transition').props()).toMatchObject({ onExited });
    });
  });

  describe('Fade', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = mount(<Fade in test="some-test-data" />);
    });

    it('should use the default styles to start the animation', () => {
      const { defaultStyles } = wrapper.find('TransitionHandler').props();

      expect(defaultStyles).toMatchObject({
        opacity: 0,
        position: 'fixed',
        zIndex: 500,
      });
    });

    it('should add the other element props', () => {
      const { ...otherProps } = wrapper.find('TransitionHandler').props();
      expect(otherProps).toMatchObject({ test: 'some-test-data' });
    });

    it('should use the transition styles', () => {
      const { transitionStyles } = wrapper.find('TransitionHandler').props();

      expect(transitionStyles).toMatchObject({
        entering: { opacity: 0 },
        entered: { opacity: 1 },
      });
    });

    it('should set "unmountOnExit" to true as default', () => {
      const { unmountOnExit } = wrapper.find('Transition').props();

      expect(unmountOnExit).toBeTruthy();
    });

    it('should pass onExited to the Transition', () => {
      const onExited = jest.fn();
      const fade = mount(<Fade in onExited={onExited} />);

      expect(fade.find('Transition').props()).toMatchObject({ onExited });
    });
  });
});
