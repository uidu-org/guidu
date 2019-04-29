jest.mock('../../../src/utils/breakpoint', () => ({
  breakpointSize: jest.fn(),
  breakpointStyles: jest.fn(),
}));
jest.mock('../../../src/utils/shouldDisplayImageThumbnail', () => ({
  shouldDisplayImageThumbnail: jest.fn(() => true),
}));

import * as React from 'react';

import { shallow, mount } from 'enzyme';
import { FileDetails } from '@uidu/media-core';
import { AnalyticsListener } from '@atlaskit/analytics-next';

import { UIAnalyticsEventInterface } from '@atlaskit/analytics-next-types';
import { mountWithIntlContext, expectToEqual } from '@uidu/media-test-helpers';
import {
  CardView,
  CardViewBase,
  CardViewOwnProps,
} from '../../../src/root/cardView';
import { FileCard } from '../../../src/files';
import { Wrapper } from '../../../src/root/styled';
import { breakpointSize } from '../../../src/utils/breakpoint';

import { shouldDisplayImageThumbnail } from '../../../src/utils/shouldDisplayImageThumbnail';

import { CardViewAnalyticsContext, CardAction } from '../../../src/index';

describe('CardView', () => {
  const file: FileDetails = {
    id: 'abcd',
    name: 'my-file',
    mimeType: 'image/png',
    size: 42,
    processingStatus: 'pending',
    mediaType: 'image',
  };

  let createAnalyticsEventMock: any;
  beforeEach(() => {
    createAnalyticsEventMock = jest.fn();
    (shouldDisplayImageThumbnail as any).mockReturnValue(true);
  });

  const shallowCardViewBaseElement = (
    props: Partial<CardViewOwnProps>,
    renderOptions = {},
  ) =>
    shallow(
      <CardViewBase
        mediaItemType={'file'}
        createAnalyticsEvent={createAnalyticsEventMock}
        status="loading"
        {...props}
      />,
      renderOptions,
    );

  it('should render FileCard when no metadata is passed', () => {
    const element = mount(<CardView status="loading" />);
    const fileCard = element.find(FileCard);
    expect(fileCard).toHaveLength(1);
  });

  it('should render FileCard with details', () => {
    const element = shallowCardViewBaseElement({ metadata: file });

    const card = element.find(FileCard);
    expect(card).toHaveLength(1);
    expect(card.props().details).toBe(file);
  });

  it('should render FileCard with other props', () => {
    const element = shallowCardViewBaseElement({
      metadata: file,
      appearance: 'image',
    });

    const fileCard = element.find(FileCard);
    expect(fileCard).toHaveLength(1);
    expect(fileCard.prop('appearance')).toEqual('image');
  });

  it('should fire onClick and onMouseEnter events when file details are passed in', () => {
    const clickHandler = jest.fn();
    const hoverHandler = jest.fn();
    const card = mount(
      <CardView
        status="loading"
        metadata={file}
        onClick={clickHandler}
        onMouseEnter={hoverHandler}
      />,
    );

    card.simulate('click');
    card.simulate('mouseEnter');

    expect(clickHandler).toHaveBeenCalledTimes(1);
    const clickHandlerArg = clickHandler.mock.calls[0][0];
    expect(clickHandlerArg.mediaItemDetails).toEqual(file);

    expect(hoverHandler).toHaveBeenCalledTimes(1);
    const hoverHandlerArg = hoverHandler.mock.calls[0][0];
    expect(hoverHandlerArg.mediaItemDetails).toEqual(file);
  });

  it('should NOT fire onSelectChange when card is NOT selectable', () => {
    const handler = jest.fn();
    const element = shallowCardViewBaseElement({
      metadata: file,
      onSelectChange: handler,
    });
    element.setProps({ selected: true });

    expect(handler).not.toHaveBeenCalled();
  });

  it('should fire onSelectChange when selected state is changed by the consumer and selectable is true', () => {
    const handler = jest.fn();
    const element = shallowCardViewBaseElement({
      metadata: file,
      onSelectChange: handler,
      selectable: true,
    });
    element.setProps({ selected: true });

    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenCalledWith({
      selected: true,
      mediaItemDetails: file,
    });
  });

  it('should render a cropped image by default', () => {
    const card = mount(
      <CardView status="complete" dataURI="a" metadata={file} />,
    );

    expect(card.find('MediaImage').prop('crop')).toBe(true);
  });

  it('should render a non-stretched image by default', () => {
    const card = mount(
      <CardView status="complete" dataURI="a" metadata={file} />,
    );

    expect(card.find('MediaImage').prop('stretch')).toBe(false);
  });

  it('should render not render a cropped image if we specify a different resizeMode', () => {
    const card = mount(
      <CardView
        status="complete"
        dataURI="a"
        metadata={file}
        resizeMode="full-fit"
      />,
    );

    expect(card.find('MediaImage').prop('crop')).toBe(false);
  });

  it('should render a stretched image if we specify stretchy-fit resizeMode', () => {
    const card = mount(
      <CardView
        status="complete"
        dataURI="a"
        metadata={file}
        resizeMode="stretchy-fit"
      />,
    );

    expect(card.find('MediaImage').prop('stretch')).toBe(true);
  });

  describe('Dimensions', () => {
    it('should render wrapper with correct breakpoint size', () => {
      const dimensions = { width: '100%', height: '50%' };

      (breakpointSize as jest.Mock<void>).mockReturnValue('small');
      const element = shallowCardViewBaseElement(
        {
          status: 'loading',
          metadata: file,
          dimensions,
        },
        { disableLifecycleMethods: true },
      );
      expect(breakpointSize).toHaveBeenCalledWith('100%');

      expect(element.find(Wrapper).props().breakpointSize).toEqual('small');
    });

    it('should render wrapper with default dimensions based on default appearance when dimensions and appearance are not provided', () => {
      const element = shallowCardViewBaseElement({
        status: 'loading',
        metadata: file,
      });
      expect(element.find(Wrapper).props().dimensions).toEqual({
        width: 156,
        height: 125,
      });
    });

    it('should use default dimensions based on passed appearance', () => {
      const element = shallowCardViewBaseElement({
        status: 'loading',
        metadata: file,
      });
      expect(element.find(Wrapper).props().dimensions).toEqual({
        width: 156,
        height: 125,
      });
    });

    it('should use passed dimensions when provided', () => {
      const element = shallowCardViewBaseElement(
        {
          status: 'loading',
          metadata: file,
          dimensions: { width: '70%', height: 100 },
        },
        { disableLifecycleMethods: true },
      );

      expect(element.find(Wrapper).props().dimensions).toEqual({
        width: '70%',
        height: 100,
      });
    });

    it('should use item type to calculate default dimensions', () => {
      const element = shallowCardViewBaseElement({
        status: 'loading',
        metadata: file,
      });
      const props = element.find(Wrapper).props();

      expect(props.dimensions).toEqual({
        width: 156,
        height: 125,
      });
    });

    it('should pass "disableOverlay" prop to <FileCard /> when mediaItemType is "file"', () => {
      const element = shallowCardViewBaseElement(
        {
          status: 'complete',
          mediaItemType: 'file',
          metadata: file,
          disableOverlay: true,
        },
        { disableLifecycleMethods: true },
      );

      expect(element.find(FileCard).props().disableOverlay).toEqual(true);
    });
  });

  it('should fire "clicked" analytics event when loading file card clicked', () => {
    const clickHandler = jest.fn();
    const analyticsEventHandler = jest.fn();
    const cardAction: CardAction = {
      handler: () => {},
      label: 'Click me',
    };
    const card = mount(
      <AnalyticsListener channel="media" onEvent={analyticsEventHandler}>
        <CardView
          status="processing"
          actions={[cardAction]}
          metadata={{ ...file }}
          onClick={clickHandler}
        />
      </AnalyticsListener>,
    );

    card.simulate('click');

    expect(analyticsEventHandler).toHaveBeenCalledTimes(1);
    const actualEvent: Partial<UIAnalyticsEventInterface> =
      analyticsEventHandler.mock.calls[0][0];
    expect(actualEvent.payload).toEqual({ action: 'clicked' });
    expect(actualEvent.context && actualEvent.context.length).toEqual(1);
    const actualContext =
      actualEvent.context &&
      (actualEvent.context[0] as CardViewAnalyticsContext);
    expect(actualContext).not.toBeUndefined();
    if (actualContext) {
      expect(actualContext.fileAttributes).toEqual({
        fileMediatype: 'image',
        fileSize: 42,
        fileStatus: 'pending',
        fileMimetype: 'image/png',
      });
      expect(actualContext.viewAttributes).toEqual({
        viewPreview: true,
        viewSize: 'auto',
        viewActionmenu: true,
      });
      expect(actualContext.loadStatus).toEqual('loading_metadata');
      expect(actualContext.componentName).toEqual('CardView');
      expect(actualContext.actionSubject).toEqual('MediaCard');
      expect(actualContext.packageVersion).toEqual(
        require('../../version.json').version,
      );
      expect(actualContext.type).toEqual('file');
      expect(actualContext.actionSubjectId).toEqual('abcd');
    }
  });

  it('should fire "clicked" analytics event when metadata is not provided', () => {
    const clickHandler = jest.fn();
    const analyticsEventHandler = jest.fn();
    const card = mountWithIntlContext(
      <AnalyticsListener channel="media" onEvent={analyticsEventHandler}>
        <CardView status="error" onClick={clickHandler} />
      </AnalyticsListener>,
    );

    card.simulate('click');

    expect(analyticsEventHandler).toHaveBeenCalledTimes(1);
    const actualEvent: Partial<UIAnalyticsEventInterface> =
      analyticsEventHandler.mock.calls[0][0];
    expect(actualEvent.payload).toEqual({ action: 'clicked' });
    expect(actualEvent.context && actualEvent.context.length).toEqual(1);
    const actualContext =
      actualEvent.context &&
      (actualEvent.context[0] as CardViewAnalyticsContext);
    expect(actualContext).not.toBeUndefined();
    if (actualContext) {
      expect(actualContext.fileAttributes).toBeUndefined();
      expect(actualContext.linkAttributes).toBeUndefined();
      expect(actualContext.viewAttributes).toEqual({
        viewPreview: false,
        viewSize: 'auto',
        viewActionmenu: false,
      });
      expect(actualContext.loadStatus).toEqual('fail');
      expect(actualContext.componentName).toEqual('CardView');
      expect(actualContext.actionSubject).toEqual('MediaCard');
      expect(actualContext.packageVersion).toEqual(
        require('../../version.json').version,
      );
      expect(actualContext.type).toEqual('file');
      expect(actualContext.actionSubjectId).toEqual(null);
    }
  });

  it('should return analytics event as a last argument when card is clicked', () => {
    const clickHandler = jest.fn();
    const analyticsEventHandler = jest.fn();
    const card = mount(
      <AnalyticsListener channel="media" onEvent={analyticsEventHandler}>
        <CardView status="loading" metadata={file} onClick={clickHandler} />
      </AnalyticsListener>,
    );

    card.simulate('click');

    expect(clickHandler).toHaveBeenCalledTimes(1);
    expect(analyticsEventHandler).toHaveBeenCalledTimes(1);
    const actualFiredEvent: Partial<UIAnalyticsEventInterface> =
      analyticsEventHandler.mock.calls[0][0];
    const actualReturnedEvent: UIAnalyticsEventInterface =
      clickHandler.mock.calls[0][1];
    expect(actualFiredEvent.hasFired).toEqual(true);
    expect(actualReturnedEvent.hasFired).toEqual(false);
    expect(actualReturnedEvent.payload.action).toEqual('clicked');
    expect(actualReturnedEvent.context).toEqual(actualFiredEvent.context);
  });

  it('should not use pointer cursor for external images', () => {
    const card = shallowCardViewBaseElement({
      dataURI: 'a',
      mediaItemType: 'external-image',
    });

    expectToEqual(card.find(Wrapper).props().shouldUsePointerCursor, false);
  });
});
