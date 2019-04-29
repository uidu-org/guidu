import {
  setState as setInteractiveImgState,
  InteractiveImg as InteractiveImgMock,
} from '../../../../mocks/_interactive-img';

const mockInteractiveImg = {
  InteractiveImg: InteractiveImgMock,
};
jest.mock(
  '../../../../../newgen/viewers/image/interactive-img',
  () => mockInteractiveImg,
);

import * as React from 'react';
import { ProcessedFileState } from '@uidu/media-core';
import {
  awaitError,
  mountWithIntlContext,
  fakeContext,
} from '@uidu/media-test-helpers';
import { ImageViewer } from '../../../../../newgen/viewers/image';

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

export function createFixture(response: Promise<Blob>): any {
  const context = fakeContext();
  (context.getImage as jest.Mock).mockReturnValue(response);
  const onClose = jest.fn();
  const onLoaded = jest.fn();
  const el = mountWithIntlContext(
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

describe('ImageViewer analytics', () => {
  it('should call onLoad with success', async () => {
    setInteractiveImgState('success');
    const response = Promise.resolve(new Blob());
    const { el } = createFixture(response);

    await response;
    expect(el.prop('onLoad')).toHaveBeenCalledWith({ status: 'success' });
  });

  it('should call onLoad with error if interactive-img fails', async () => {
    setInteractiveImgState('error');
    const response = Promise.resolve(new Blob());
    const { el } = createFixture(response);

    await response;
    expect(el.prop('onLoad')).toHaveBeenCalledWith({
      status: 'error',
      errorMessage: 'Interactive-img render failed',
    });
  });

  it('should call onLoad with error if there is an error fetching metadata', async () => {
    const response = Promise.reject(new Error('test_error'));
    const { el } = createFixture(response);

    await awaitError(response, 'test_error');
    expect(el.prop('onLoad')).toHaveBeenCalledWith({
      status: 'error',
      errorMessage: 'test_error',
    });
  });
});
