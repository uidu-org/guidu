jest.mock('../../../src/utils/getDataURIFromFileState');
import { AnalyticsListener } from '@atlaskit/analytics-next';
import { UIAnalyticsEventInterface } from '@atlaskit/analytics-next-types';
import {
  Context,
  ExternalImageIdentifier,
  FileDetails,
  FileIdentifier,
  FileState,
} from '@uidu/media-core';
import { fakeContext, nextTick } from '@uidu/media-test-helpers';
import { mount, shallow } from 'enzyme';
import * as React from 'react';
import { Observable, ReplaySubject } from 'rxjs';
import { CardAction, CardDimensions, CardProps } from '../../../src';
import { Card } from '../../../src/root/card';
import { CardView } from '../../../src/root/cardView';
import { InlinePlayer } from '../../../src/root/inlinePlayer';
import {
  FilePreview,
  getDataURIFromFileState,
} from '../../../src/utils/getDataURIFromFileState';
import { LazyContent } from '../../../src/utils/lazyContent';

describe('Card', () => {
  const fileIdentifier: FileIdentifier = {
    id: 'some-random-id',
    mediaItemType: 'file',
    collectionName: 'some-collection-name',
    occurrenceKey: 'some-occurrence-key',
  };
  const setup = (
    context: Context = fakeContext(),
    props?: Partial<CardProps>,
    filePreview: FilePreview = { src: 'some-data-uri', orientation: 6 },
  ) => {
    (getDataURIFromFileState as any).mockReset();
    (getDataURIFromFileState as any).mockReturnValue(filePreview);
    const component = shallow(
      <Card
        context={context}
        identifier={fileIdentifier}
        isLazy={false}
        {...props}
      />,
    );

    return {
      component,
      context,
    };
  };
  const createContextWithGetFile = (fileState: Partial<FileState> = {}) =>
    fakeContext({
      file: {
        getFileState: Observable.of({
          id: '123',
          mediaType: 'image',
          status: 'processed',
          mimeType: 'image/png',
          name: 'file-name',
          size: 10,
          ...fileState,
        }),
      },
    });
  const emptyPreview: FilePreview = { src: undefined };

  it('should use the new context to create the subscription when context prop changes', async () => {
    const firstContext = fakeContext({});
    const secondContext = fakeContext({}) as Context;
    const { component } = setup(firstContext);
    component.setProps({ context: secondContext, fileIdentifier });

    const { id, collectionName, occurrenceKey } = fileIdentifier;
    await nextTick();
    expect(secondContext.file.getFileState).toHaveBeenCalledTimes(1);
    expect(secondContext.file.getFileState).toBeCalledWith(id, {
      collectionName,
      occurrenceKey,
    });
    expect(component.find(CardView)).toHaveLength(1);
  });

  it('should refetch the image when width changes to a higher value', async () => {
    const initialDimensions: CardDimensions = {
      width: 100,
      height: 200,
    };
    const newDimensions: CardDimensions = {
      ...initialDimensions,
      width: 1000,
    };
    const context = createContextWithGetFile();
    const { component } = setup(
      context,
      {
        identifier: fileIdentifier,
        dimensions: initialDimensions,
      },
      emptyPreview,
    );
    component.setProps({ context, dimensions: newDimensions });

    await nextTick();
    expect(context.getImage).toHaveBeenCalledTimes(2);
    expect(context.getImage).toHaveBeenLastCalledWith('some-random-id', {
      allowAnimated: true,
      collection: 'some-collection-name',
      mode: 'crop',
      width: 1000,
      height: 200,
    });
  });

  it('should refetch the image when height changes to a higher value', async () => {
    const initialDimensions: CardDimensions = {
      width: 100,
      height: 200,
    };
    const newDimensions: CardDimensions = {
      ...initialDimensions,
      height: 2000,
    };
    const context = createContextWithGetFile();
    const { component } = setup(
      context,
      {
        identifier: fileIdentifier,
        dimensions: initialDimensions,
      },
      emptyPreview,
    );
    component.setProps({ context, dimensions: newDimensions });

    await nextTick();
    expect(context.getImage).toHaveBeenCalledTimes(2);
    expect(context.getImage).toHaveBeenLastCalledWith('some-random-id', {
      allowAnimated: true,
      collection: 'some-collection-name',
      mode: 'crop',
      width: 100,
      height: 2000,
    });
  });

  it('should not refetch the image when width changes to a smaller value', async () => {
    const initialDimensions: CardDimensions = {
      width: 100,
      height: 200,
    };
    const newDimensions: CardDimensions = {
      ...initialDimensions,
      width: 10,
    };
    const context = createContextWithGetFile({
      preview: undefined,
    });
    const { component } = setup(
      context,
      {
        identifier: fileIdentifier,
        dimensions: initialDimensions,
      },
      emptyPreview,
    );
    component.setProps({ context, dimensions: newDimensions });

    await nextTick();
    expect(context.getImage).toHaveBeenCalledTimes(1);
  });

  it('should not refetch the image when height changes to a smaller value', async () => {
    const initialDimensions: CardDimensions = {
      width: 100,
      height: 200,
    };
    const newDimensions: CardDimensions = {
      ...initialDimensions,
      height: 20,
    };
    const context = createContextWithGetFile();
    const { component } = setup(
      context,
      {
        identifier: fileIdentifier,
        dimensions: initialDimensions,
      },
      emptyPreview,
    );
    component.setProps({ context, dimensions: newDimensions });

    await nextTick();
    expect(context.getImage).toHaveBeenCalledTimes(1);
  });

  it('should fire onClick when passed in as a prop and CardView fires onClick', () => {
    const context = fakeContext() as any;
    const clickHandler = jest.fn();
    const card = shallow(
      <Card
        context={context}
        identifier={fileIdentifier}
        onClick={clickHandler}
      />,
    );
    const cardViewOnClick = card.find(CardView).props().onClick;

    if (!cardViewOnClick) {
      throw new Error('CardView onClick was undefined');
    }

    expect(clickHandler).not.toHaveBeenCalled();
    cardViewOnClick({} as any, {} as any);
    expect(clickHandler).toHaveBeenCalledTimes(1);
  });

  it('should pass onMouseEnter to CardView', () => {
    const context = fakeContext() as any;
    const hoverHandler = () => {};
    const card = shallow(
      <Card
        context={context}
        identifier={fileIdentifier}
        onMouseEnter={hoverHandler}
      />,
    );

    expect(card.find(CardView).props().onMouseEnter).toEqual(hoverHandler);
  });

  it('should use lazy load by default', () => {
    const context = fakeContext() as any;
    const hoverHandler = () => {};
    const card = shallow(
      <Card
        context={context}
        identifier={fileIdentifier}
        onMouseEnter={hoverHandler}
      />,
    );
    expect(card.find(LazyContent)).toHaveLength(1);
  });

  it('should not use lazy load when "isLazy" is false', () => {
    const context = fakeContext() as any;
    const hoverHandler = () => {};
    const card = shallow(
      <Card
        isLazy={false}
        context={context}
        identifier={fileIdentifier}
        onMouseEnter={hoverHandler}
      />,
    );

    expect(card.find(LazyContent)).toHaveLength(0);
  });

  it('should pass properties down to CardView', () => {
    const context = fakeContext() as any;
    const card = shallow(
      <Card
        context={context}
        identifier={fileIdentifier}
        dimensions={{ width: 100, height: 50 }}
      />,
    );

    expect(card.find(CardView).props().dimensions).toEqual({
      width: 100,
      height: 50,
    });
  });

  it('should create a card placeholder with the right props', () => {
    const context = fakeContext() as any;
    const fileCard = shallow(
      <Card
        context={context}
        identifier={fileIdentifier}
        dimensions={{ width: 100, height: 50 }}
      />,
    );
    const filePlaceholder = fileCard.find(CardView);
    const { status, mediaItemType, dimensions } = filePlaceholder.props();

    expect(status).toBe('loading');
    expect(mediaItemType).toBe('file');
    expect(dimensions).toEqual({ width: 100, height: 50 });
  });

  it('should use "crop" as default resizeMode', () => {
    const context = fakeContext();
    const card = mount(
      <Card context={context} identifier={fileIdentifier} isLazy={false} />,
    );

    expect(card.find(CardView).prop('resizeMode')).toBe('crop');
  });

  it('should pass right resizeMode down', () => {
    const context = fakeContext();
    const card = mount(
      <Card
        context={context}
        identifier={fileIdentifier}
        isLazy={false}
        resizeMode="full-fit"
      />,
    );

    expect(card.find(CardView).prop('resizeMode')).toBe('full-fit');
  });

  it('should contain analytics context with identifier info', () => {
    const analyticsEventHandler = jest.fn();
    const fetchImageDataUriSpy = jest.fn(() => Promise.resolve());
    const context = fakeContext({
      getDataUriService: {
        fetchImageDataUri: fetchImageDataUriSpy,
      },
    });
    const card = mount(
      <AnalyticsListener channel="media" onEvent={analyticsEventHandler}>
        <Card
          context={context}
          identifier={fileIdentifier}
          isLazy={false}
          resizeMode="full-fit"
        />
      </AnalyticsListener>,
    );

    card.simulate('click');

    expect(analyticsEventHandler).toHaveBeenCalledTimes(1);
    const actualFiredEvent: UIAnalyticsEventInterface =
      analyticsEventHandler.mock.calls[0][0];
    expect(actualFiredEvent.context[0]).toEqual(
      expect.objectContaining({
        actionSubject: 'MediaCard',
        actionSubjectId: 'some-random-id',
        componentName: 'Card',
        packageName: '@uidu/media-card',
      }),
    );
  });

  it('should pass "disableOverlay" to CardView', () => {
    const context = fakeContext();
    const card = shallow(
      <Card
        context={context}
        identifier={fileIdentifier}
        isLazy={false}
        resizeMode="full-fit"
        disableOverlay={true}
      />,
      { disableLifecycleMethods: true },
    );

    expect(card.find(CardView).prop('disableOverlay')).toBe(true);
  });

  it('should use context.file.getFile to fetch file data', async () => {
    const { context } = setup();
    await nextTick();
    expect(context.file.getFileState).toHaveBeenCalledTimes(1);
    expect(context.file.getFileState).toBeCalledWith('some-random-id', {
      collectionName: 'some-collection-name',
      occurrenceKey: 'some-occurrence-key',
    });
  });

  it('should work with async identifier', async () => {
    const identifier: FileIdentifier = {
      id: Promise.resolve('file-id'),
      mediaItemType: 'file',
      collectionName: 'collection',
      occurrenceKey: 'some-occurrence-key',
    };
    const { context } = setup(undefined, { identifier });
    await nextTick();
    expect(context.file.getFileState).toHaveBeenCalledTimes(1);
    expect(context.file.getFileState).toBeCalledWith('file-id', {
      collectionName: 'collection',
      occurrenceKey: 'some-occurrence-key',
    });
  });

  it('should set dataURI only if its not present', async () => {
    const { component } = setup();
    await nextTick();
    expect(getDataURIFromFileState).toHaveBeenCalledTimes(1);
    expect(component.state('dataURI')).toEqual('some-data-uri');
  });

  it('should set preview orientation and pass it down do view', async () => {
    const { component } = setup();
    await nextTick();

    expect(component.state('previewOrientation')).toEqual(6);
    component.update();
    expect(component.find(CardView).prop('previewOrientation')).toEqual(6);
  });

  it('should set right state when file is uploading', async () => {
    const context = createContextWithGetFile({
      status: 'uploading',
      progress: 0.2,
    });
    const { component } = setup(context);

    await nextTick();
    expect(component.state()).toEqual({
      status: 'uploading',
      dataURI: 'some-data-uri',
      isCardVisible: true,
      progress: 0.2,
      previewOrientation: 6,
      isPlayingFile: false,
      metadata: {
        id: '123',
        mediaType: 'image',
        mimeType: 'image/png',
        name: 'file-name',
        size: 10,
      },
    });
  });

  it('should set right state when file is processing', async () => {
    const context = createContextWithGetFile({
      status: 'uploading',
    });
    const { component } = setup(context);

    await nextTick();
    expect(component.state()).toEqual({
      status: 'uploading',
      dataURI: 'some-data-uri',
      progress: undefined,
      isCardVisible: true,
      isPlayingFile: false,
      previewOrientation: 6,
      metadata: {
        id: '123',
        mediaType: 'image',
        mimeType: 'image/png',
        name: 'file-name',
        size: 10,
      },
    });
  });

  it('should set right state when file is processed', async () => {
    const context = createContextWithGetFile();
    const { component } = setup(context, undefined, {
      src: undefined,
      orientation: 6,
    });

    // we need to wait for 2 promises: fetch metadata + fetch preview
    await nextTick();
    await nextTick();

    expect(component.state()).toEqual({
      status: 'complete',
      dataURI: 'mock result of URL.createObjectURL()',
      progress: undefined,
      isCardVisible: true,
      isPlayingFile: false,
      previewOrientation: 6,
      metadata: {
        id: '123',
        mediaType: 'image',
        name: 'file-name',
        mimeType: 'image/png',
        size: 10,
      },
    });
  });

  it('should render error card when getFileState resolves with status=error', async () => {
    const context = createContextWithGetFile({ status: 'error' });
    const { component } = setup(context);

    await nextTick();
    component.update();
    expect(component.find(CardView).prop('status')).toEqual('error');
  });

  it('should render failed card when getFileState resolves with status=failed', async () => {
    const context = createContextWithGetFile({
      status: 'failed-processing',
    });
    const { component } = setup(context);

    await nextTick();
    component.update();
    const { status, metadata } = component.find(CardView).props();
    expect(status).toEqual('failed-processing');
    expect(metadata).toEqual({
      id: '123',
      size: 10,
      name: 'file-name',
      mimeType: 'image/png',
      mediaType: 'image',
    } as FileDetails);
  });

  it('should render error card when getFileState fails', async () => {
    const getFileState = new Observable(subscriber => {
      subscriber.error('some-error');
    });
    const context = fakeContext({
      file: { getFileState },
    });
    const { component } = setup(context);

    await nextTick();
    expect(component.state('error')).toEqual('some-error');
    component.update();
    expect(component.find(CardView).prop('status')).toEqual('error');
  });

  it('should fetch remote preview when file is processed and there is no local preview', async () => {
    const context = createContextWithGetFile();
    setup(context, undefined, emptyPreview);

    // we need to wait for 2 promises: fetch metadata + fetch preview
    await nextTick();
    await nextTick();

    expect(context.getImage).toHaveBeenCalledTimes(1);
    expect(context.getImage).toBeCalledWith('some-random-id', {
      collection: 'some-collection-name',
      height: 125,
      width: 156,
      allowAnimated: true,
      mode: 'crop',
    });
  });

  it('should not fetch remote preview when file is processed and there is local preview', async () => {
    const subject = new ReplaySubject<FileState>(1);
    const baseState: FileState = {
      id: '123',
      mediaType: 'image',
      status: 'processing',
      mimeType: 'image/png',
      name: 'file-name',
      size: 10,
    };
    subject.next(baseState);
    const context = fakeContext({
      file: {
        getFileState: subject,
      },
    });
    const { component } = setup(context);

    // we need to wait for 2 promises: fetch metadata + fetch preview
    await nextTick();
    await nextTick();

    expect(component.state('dataURI')).toEqual('some-data-uri');
    expect(context.getImage).toHaveBeenCalledTimes(0);

    subject.next({
      ...baseState,
      status: 'processed',
      artifacts: {} as any,
    });
    (getDataURIFromFileState as any).mockReturnValue({
      src: 'fooo',
      orientation: 6,
    });

    await nextTick();
    await nextTick();

    // We want to make sure that when transition from "processing" to "processed" we still don't call getImage if we already have preview
    expect(component.state('dataURI')).toEqual('some-data-uri');
    expect(component.state('status')).toEqual('complete');
    expect(context.getImage).toHaveBeenCalledTimes(0);
  });

  it('should pass resize mode down to getImage call', async () => {
    const context = createContextWithGetFile();
    setup(
      context,
      {
        resizeMode: 'full-fit',
      },
      emptyPreview,
    );

    // we need to wait for 2 promises: fetch metadata + fetch preview
    await nextTick();
    await nextTick();

    expect(context.getImage).toBeCalledWith(
      'some-random-id',
      expect.objectContaining({
        mode: 'full-fit',
      }),
    );
  });

  it('should change mode from stretchy-fit to full-fit while passing down to getImage call', async () => {
    const context = createContextWithGetFile();
    setup(
      context,
      {
        resizeMode: 'stretchy-fit',
      },
      emptyPreview,
    );

    // we need to wait for 2 promises: fetch metadata + fetch preview
    await nextTick();
    await nextTick();

    expect(context.getImage).toBeCalledWith(
      'some-random-id',
      expect.objectContaining({
        mode: 'full-fit',
      }),
    );
  });

  it('should render CardView with expected props', async () => {
    const context = createContextWithGetFile();
    const { component } = setup(
      context,
      {
        dimensions: { width: 10, height: 20 },
        selectable: true,
        selected: true,
        resizeMode: 'fit',
        disableOverlay: true,
      },
      emptyPreview,
    );

    // we need to wait for 2 promises: fetch metadata + fetch preview
    await nextTick();
    await nextTick();
    component.update();

    expect(component.find(CardView).props()).toEqual(
      expect.objectContaining({
        appearance: 'auto',
        dataURI: 'mock result of URL.createObjectURL()',
        dimensions: { width: 10, height: 20 },
        disableOverlay: true,
        mediaItemType: 'file',
        progress: undefined,
        resizeMode: 'fit',
        selectable: true,
        selected: true,
        status: 'complete',
      }),
    );

    expect(component.find(CardView).prop('metadata')).toEqual({
      id: '123',
      mediaType: 'image',
      name: 'file-name',
      mimeType: 'image/png',
      size: 10,
    });
  });

  it('should cleanup resources when unmounting', () => {
    const unsubscribe = jest.fn();
    const releaseDataURI = jest.fn();
    const { component } = setup();
    const instance = component.instance() as Card;

    instance.unsubscribe = unsubscribe;
    instance.releaseDataURI = releaseDataURI;

    component.unmount();
    expect(unsubscribe).toHaveBeenCalledTimes(1);
    expect(releaseDataURI).toHaveBeenCalledTimes(1);
  });

  describe('Retry', () => {
    it('should pass down "onRetry" prop when an error occurs', async () => {
      const { component, context } = setup();
      const cardViewOnError = component.find(CardView).prop('onRetry')!;
      await nextTick();
      expect(context.file.getFileState).toHaveBeenCalledTimes(1);
      cardViewOnError();
      await nextTick();
      expect(context.file.getFileState).toHaveBeenCalledTimes(2);
    });
  });

  describe('External image identifier', () => {
    it('should work with external image identifier', () => {
      const identifier: ExternalImageIdentifier = {
        mediaItemType: 'external-image',
        dataURI: 'bla',
        name: 'some external image',
      };

      const { component } = setup(undefined, { identifier });

      expect(component.find('CardView').prop('dataURI')).toEqual('bla');
      expect(component.find('CardView').prop('metadata')).toEqual({
        id: 'bla',
        mediaType: 'image',
        name: 'some external image',
      });
    });

    it('should use dataURI as default name', () => {
      const identifier: ExternalImageIdentifier = {
        mediaItemType: 'external-image',
        dataURI: 'bla',
      };

      const { component } = setup(undefined, { identifier });

      expect(component.find('CardView').prop('metadata')).toEqual({
        id: 'bla',
        mediaType: 'image',
        name: 'bla',
      });
    });
  });

  it('should add download Action when in failed-processing state', () => {
    const initialActions: Array<CardAction> = [
      {
        handler: () => {},
      },
    ];
    const { component } = setup(undefined, {
      actions: initialActions,
    });
    component.setState({
      status: 'failed-processing',
      metadata: {},
    });
    component.update();
    const actions = component.find(CardView).prop('actions')!;
    expect(actions).toHaveLength(2);
    expect(actions[0].label).toEqual('Download');
  });

  it('should call item download when download Action is executed', async () => {
    const { component, context } = setup();
    component.setState({
      status: 'failed-processing',
      metadata: {
        name: 'some-file-name',
      },
    });
    component.update();
    const actions = component.find(CardView).prop('actions')!;
    actions[0].handler();
    await fileIdentifier.id;
    expect(context.file.downloadBinary).toHaveBeenCalledWith(
      fileIdentifier.id,
      'some-file-name',
      fileIdentifier.collectionName,
    );
  });

  describe('Inline player', () => {
    it('should render InlinePlayer when isPlayingFile=true', () => {
      const { component } = setup();

      component.setState({
        isPlayingFile: true,
      });
      component.update();
      expect(component.find(InlinePlayer)).toHaveLength(1);
    });

    it('should set isPlayingFile=true when clicking on a video file', () => {
      const { component } = setup(undefined, { useInlinePlayer: true });
      const instance = component.instance() as Card;

      instance.onClick({
        mediaItemDetails: {
          mediaType: 'video',
        },
      } as any);

      expect(component.state('isPlayingFile')).toBeTruthy();
    });
  });
});
