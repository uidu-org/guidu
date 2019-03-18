jest.mock('../../customMediaPlayer/fullscreen');
import * as React from 'react';
import { mount } from 'enzyme';
import FullScreenIcon from '@atlaskit/icon/glyph/vid-full-screen-on';
import VidPlayIcon from '@atlaskit/icon/glyph/vid-play';
import VidHdCircleIcon from '@atlaskit/icon/glyph/vid-hd-circle';
import Button from '@uidu/button';
import Spinner  from '@uidu/spinner';
import { fakeIntl } from '@uidu/media-test-helpers';
import {
  CustomMediaPlayer,
  CustomMediaPlayerProps,
} from '../../customMediaPlayer';
import { toggleFullscreen } from '../../customMediaPlayer/fullscreen';
import { TimeRange, TimeRangeProps } from '../../customMediaPlayer/timeRange';
import { CurrentTime } from '../../customMediaPlayer/styled';
import { Shortcut } from '../../';

describe('<CustomMediaPlayer />', () => {
  const setup = (props?: Partial<CustomMediaPlayerProps>) => {
    const onChange = jest.fn();
    const component = mount(
      <CustomMediaPlayer
        type="video"
        isAutoPlay={true}
        isHDAvailable={false}
        src="video-src"
        intl={fakeIntl}
        {...props}
      />,
    );

    return {
      component,
      onChange,
    };
  };

  describe('render', () => {
    it('should render the video element', () => {
      const { component } = setup();

      expect(component.find('video')).toHaveLength(1);
    });

    it('should render the right icon based on the video state (play/pause)', () => {
      const { component } = setup();
      const button = component.find(Button).first() as any;

      expect(button.prop('iconBefore').type).toEqual(VidPlayIcon);
    });

    it('should render a time range with the time properties', () => {
      const { component } = setup();

      expect(component.find(TimeRange).length).toBeGreaterThan(1);
      const expectedProps: Partial<TimeRangeProps> = {
        currentTime: 0,
        duration: 0,
        bufferedTime: 0,
      };
      expect(
        component
          .find(TimeRange)
          .at(0)
          .props(),
      ).toEqual(expect.objectContaining(expectedProps));
    });

    it('should render the volume controls', () => {
      const { component } = setup();

      expect(
        component
          .find(TimeRange)
          .at(1)
          .prop('currentTime'),
      ).toEqual(1);
    });

    it('should render the time (current/total) in the right format', () => {
      const { component } = setup();

      expect(component.find(CurrentTime).text()).toEqual('0:00 / 0:00');
    });

    it('should render the fullscreen button', () => {
      const { component } = setup();

      expect(
        (component
          .find(Button)
          .last()
          .prop('iconBefore') as any).type,
      ).toEqual(FullScreenIcon);
    });

    it('should render hd button if available', () => {
      const { component } = setup({
        isHDAvailable: true,
      });

      expect(component.find(Button)).toHaveLength(4);
      expect(
        (component
          .find(Button)
          .at(2)
          .prop('iconBefore') as any).type,
      ).toEqual(VidHdCircleIcon);
      component.setProps({
        isHDAvailable: false,
      });
      expect(component.find(Button)).toHaveLength(3);
    });

    it('should render spinner when the video is in loading state', () => {
      const { component } = setup();

      component.find('video').simulate('waiting');
      expect(component.find(Spinner)).toHaveLength(1);
    });
  });

  describe('interaction', () => {
    it('should use keyboard shortcuts to toggle video state', () => {
      const showControls = jest.fn();
      const { component } = setup({ showControls, isShortcutEnabled: true });

      component
        .find(Shortcut)
        .first()
        .prop('handler')();
      component
        .find(Shortcut)
        .last()
        .prop('handler')();

      expect(component.find(Shortcut)).toHaveLength(2);
      expect(showControls).toHaveBeenCalledTimes(2);
    });

    it('should fire callback when hd button is clicked', () => {
      const onHDToggleClick = jest.fn();
      const { component } = setup({
        isHDAvailable: true,
        onHDToggleClick,
      });

      component
        .find(Button)
        .at(2)
        .simulate('click');
      expect(onHDToggleClick).toHaveBeenCalledTimes(1);
    });

    it('should request full screen when fullscreen button is clicked', () => {
      const { component } = setup();

      component
        .find(Button)
        .last()
        .simulate('click');
      expect(toggleFullscreen).toHaveBeenCalledTimes(1);
    });

    it('should update TimeRange when time changes', () => {
      const { component } = setup();

      component.find('video').simulate('timeUpdate', {
        target: {
          currentTime: 10,
          buffered: [],
        },
      });
      expect(
        component
          .find(TimeRange)
          .at(0)
          .prop('currentTime'),
      ).toEqual(10);
    });

    it('should update buffered time when it changes', () => {
      const { component } = setup();

      component.find('video').simulate('timeUpdate', {
        target: {
          currentTime: 10,
          buffered: {
            length: 1,
            end: () => 10,
          },
        },
      });
      expect(
        component
          .find(TimeRange)
          .at(0)
          .prop('bufferedTime'),
      ).toEqual(10);
    });

    it("should update Volume's TimeRange when volume changes", () => {
      const { component } = setup();

      component.find('video').simulate('volumeChange', {
        target: {
          volume: 0.3,
        },
      });
      expect(
        component
          .find(TimeRange)
          .at(1)
          .prop('currentTime'),
      ).toEqual(0.3);
    });
  });

  describe('auto play', () => {
    it('should use autoplay when requested', () => {
      const { component } = setup({
        isHDAvailable: true,
        isAutoPlay: true,
      });
      expect(component.find({ autoPlay: true })).toHaveLength(2);
    });

    it('should not use autoplay when not requested', () => {
      const { component } = setup({
        isHDAvailable: true,
        isAutoPlay: false,
      });
      expect(component.find({ autoPlay: true })).toHaveLength(0);
    });
  });
});
