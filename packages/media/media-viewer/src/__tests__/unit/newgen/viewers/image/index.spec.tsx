import * as React from 'react';
import { ProcessedFileState } from '@uidu/media-core';
import {
  awaitError,
  mountWithIntlContext,
  fakeContext,
} from '@uidu/media-test-helpers';
import {
  ImageViewer,
  REQUEST_CANCELLED,
  ImageViewerProps,
} from '../../../../../newgen/viewers/image';
import { BaseState } from '../../../../../newgen/viewers/base-viewer';
import { Content } from '../../../../../newgen/content';

const collectionName = 'some-collection';
const imageItem: ProcessedFileState = {
  id: 'some-id',
  status: 'processed',
  name: 'my image',
  size: 11222,
  mediaType: 'image',
  mimeType: 'jpeg',
  artifacts: {},
};

function createFixture(response: Promise<Blob>) {
  const context = fakeContext();
  (context.getImage as jest.Mock).mockReturnValue(response);
  const onClose = jest.fn();
  const onLoaded = jest.fn();
  const el = mountWithIntlContext<ImageViewerProps, BaseState<Content>>(
    <ImageViewer
      context={context}
      item={imageItem}
      collectionName={collectionName}
      onClose={onClose}
      onLoad={onLoaded}
    />,
  );
  return { context, el, onClose };
}

describe('ImageViewer', () => {
  it('assigns an object url for images when successful', async () => {
    const response = Promise.resolve(new Blob());
    const { el } = createFixture(response);

    await response;

    expect(el.state().content.data).toBeDefined();
  });

  it('does not update state when image fetch request is cancelled', async () => {
    const response = Promise.reject(new Error(REQUEST_CANCELLED));
    const { el } = createFixture(response);

    (el as any).instance()['preventRaceCondition'] = jest.fn();

    await awaitError(response, REQUEST_CANCELLED);

    expect(
      (el as any).instance()['preventRaceCondition'].mock.calls.length === 1,
    );
  });

  it('cancels an image fetch request when unmounted', () => {
    const abort = jest.fn();
    class FakeAbortController {
      abort = abort;
    }
    (global as any).AbortController = FakeAbortController;
    const response: any = new Promise(() => {});
    const { el } = createFixture(response);

    el.unmount();

    expect(abort).toHaveBeenCalled();
  });

  it('revokes an existing object url when unmounted', async () => {
    const response = Promise.resolve(new Blob());
    const { el } = createFixture(response);

    const revokeObjectUrl = jest.fn();
    (el as any).instance()['revokeObjectUrl'] = revokeObjectUrl;

    await response;
    el.unmount();

    expect(revokeObjectUrl).toHaveBeenCalled();
  });

  it('should pass collectionName to context.getImage', async () => {
    const response = Promise.resolve(new Blob());
    const { el, context } = createFixture(response);

    await response;
    el.update();

    expect(context.getImage).toHaveBeenCalledWith(
      'some-id',
      expect.objectContaining({ collection: 'some-collection' }),
      expect.anything(),
    );
  });

  it('MSW-700: clicking on background of ImageViewer does not close it', async () => {
    const response = Promise.resolve(new Blob());
    const { el, onClose } = createFixture(response);

    await response;
    el.simulate('click');

    expect(onClose).toHaveBeenCalled();
  });
});
