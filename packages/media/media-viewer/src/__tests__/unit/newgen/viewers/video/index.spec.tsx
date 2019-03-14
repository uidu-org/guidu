import * as util from '../../../../../newgen/utils';
const constructAuthTokenUrlSpy = jest.spyOn(util, 'constructAuthTokenUrl');
import * as React from 'react';
import Button from '@atlaskit/button';
import { Auth, ProcessedFileState } from '@uidu/media-core';
import Spinner  from '@uidu/spinner';
import { awaitError, mountWithIntlContext } from '@uidu/media-test-helpers';
import { CustomMediaPlayer } from '@uidu/media-ui';
import { createContext } from '../../../_stubs';
import { VideoViewer, Props } from '../../../../../newgen/viewers/video';
import { ErrorMessage } from '../../../../../newgen/error';

const token = 'some-token';
const clientId = 'some-client-id';
const baseUrl = 'some-base-url';

const videoItem: ProcessedFileState = {
  id: 'some-id',
  status: 'processed',
  name: 'my video',
  size: 11222,
  mediaType: 'video',
  mimeType: 'mp4',
  artifacts: {
    'video_640.mp4': {
      url: '/video',
      processingStatus: 'succeeded',
    },
    'video_1280.mp4': {
      url: '/video_hd',
      processingStatus: 'succeeded',
    },
  },
};
const sdVideoItem: ProcessedFileState = {
  id: 'some-id',
  status: 'processed',
  name: 'my video',
  size: 11222,
  mediaType: 'video',
  mimeType: 'mp4',
  artifacts: {
    'video_640.mp4': {
      url: '/video',
      processingStatus: 'succeeded',
    },
  },
};

const videoItemWithNoArtifacts: ProcessedFileState = {
  ...videoItem,
  artifacts: {},
};

function createFixture(
  authPromise: Promise<Auth>,
  props?: Partial<Props>,
  item?: ProcessedFileState,
) {
  const context = createContext({ authPromise });
  const el = mountWithIntlContext(
    <VideoViewer
      context={context}
      item={item || videoItem}
      {...props}
      previewCount={0}
    />,
  );
  return { context, el };
}

describe('Video viewer', () => {
  afterEach(() => {
    constructAuthTokenUrlSpy.mockClear();
    localStorage.clear();
    (localStorage.setItem as jest.Mock).mockClear();
  });

  it('assigns a src for videos when successful', async () => {
    const authPromise = Promise.resolve({ token, clientId, baseUrl });
    const { el } = createFixture(authPromise);
    await (el as any).instance()['init']();
    el.update();
    expect(el.find(CustomMediaPlayer).prop('src')).toEqual(
      'some-base-url/video_hd?client=some-client-id&token=some-token',
    );
  });

  it('shows spinner when pending', async () => {
    const authPromise: any = new Promise(() => {});
    const { el } = createFixture(authPromise);
    el.update();
    expect(el.find(Spinner)).toHaveLength(1);
  });

  it('shows error message if there is an error generating the preview', async () => {
    const authPromise = Promise.reject(new Error('test error'));
    const { el } = createFixture(authPromise);
    await awaitError(authPromise, 'test error');
    el.update();
    expect(el.find(ErrorMessage)).toHaveLength(1);

    const errorMessage = el.find(ErrorMessage);
    expect(errorMessage).toHaveLength(1);
    expect(errorMessage.text()).toContain(
      "We couldn't generate a preview for this file",
    );

    // download button:
    expect(errorMessage.text()).toContain(
      'Try downloading the file to view it.',
    );
    expect(errorMessage.find(Button)).toHaveLength(1);
  });

  it('shows error message when there are not video artifacts in the media item', async () => {
    const authPromise = Promise.resolve({ token, clientId, baseUrl });
    const { el } = createFixture(authPromise, {}, videoItemWithNoArtifacts);

    await (el as any).instance()['init']();
    el.update();

    const errorMessage = el.find(ErrorMessage);

    expect(errorMessage).toHaveLength(1);
    expect(errorMessage.text()).toContain(
      "We couldn't generate a preview for this file",
    );
  });

  it('MSW-720: passes collectionName to constructAuthTokenUrl', async () => {
    const collectionName = 'some-collection';
    const authPromise = Promise.resolve({ token, clientId, baseUrl });
    const { el } = createFixture(authPromise, { collectionName });
    await (el as any).instance()['init']();
    el.update();
    expect(constructAuthTokenUrlSpy.mock.calls[0][2]).toEqual(collectionName);
  });

  it('should render a custom video player if the feature flag is active', async () => {
    const authPromise = Promise.resolve({ token, clientId, baseUrl });
    const { el } = createFixture(authPromise);

    await (el as any).instance()['init']();
    el.update();

    expect(el.find(CustomMediaPlayer)).toHaveLength(1);
    expect(el.find(CustomMediaPlayer).prop('src')).toEqual(
      'some-base-url/video_hd?client=some-client-id&token=some-token',
    );
  });

  it('should toggle hd when button is clicked', async () => {
    const authPromise = Promise.resolve({ token, clientId, baseUrl });
    const { el } = createFixture(authPromise);

    await (el as any).instance()['init']();
    el.update();
    expect(el.state('isHDActive')).toBeTruthy();
    el.find(Button)
      .at(2)
      .simulate('click');
    expect(el.state('isHDActive')).toBeFalsy();
  });

  it('should default to hd if available', async () => {
    const authPromise = Promise.resolve({ token, clientId, baseUrl });
    const { el } = createFixture(authPromise);

    await (el as any).instance()['init']();
    el.update();
    expect(el.state('isHDActive')).toBeTruthy();
  });

  it('should default to sd if hd is not available', async () => {
    const authPromise = Promise.resolve({ token, clientId, baseUrl });
    const { el } = createFixture(authPromise, {}, sdVideoItem);

    await (el as any).instance()['init']();
    el.update();
    expect(el.state('isHDActive')).toBeFalsy();
  });

  it('should save video quality when changes', async () => {
    const authPromise = Promise.resolve({ token, clientId, baseUrl });
    const { el } = createFixture(authPromise, {});

    await (el as any).instance()['init']();
    el.update();
    el.find(Button)
      .at(2)
      .simulate('click');
    expect(localStorage.setItem).toBeCalledWith(
      'mv_video_player_quality',
      'sd',
    );
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  });

  it('should default to sd if previous quality was sd', async () => {
    localStorage.setItem('mv_video_player_quality', 'sd');
    const authPromise = Promise.resolve({ token, clientId, baseUrl });
    const { el } = createFixture(authPromise, {});

    await (el as any).instance()['init']();
    el.update();
    expect(el.state('isHDActive')).toBeFalsy();
  });

  describe('AutoPlay', () => {
    async function createAutoPlayFixture(previewCount: number) {
      const authPromise = Promise.resolve({ token, clientId, baseUrl });
      const context = createContext({ authPromise });
      const el = mountWithIntlContext(
        <VideoViewer
          context={context}
          previewCount={previewCount}
          item={videoItem}
        />,
      );
      await (el as any).instance()['init']();
      el.update();
      return el;
    }

    it('should auto play video viewer when it is the first preview', async () => {
      const el = await createAutoPlayFixture(0);
      expect(el.find(CustomMediaPlayer)).toHaveLength(1);
      expect(el.find({ autoPlay: true })).toHaveLength(2);
    });

    it('should not auto play video viewer when it is not the first preview', async () => {
      const el = await createAutoPlayFixture(1);
      expect(el.find(CustomMediaPlayer)).toHaveLength(1);
      expect(el.find({ autoPlay: true })).toHaveLength(0);
    });
  });
});
