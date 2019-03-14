import * as util from '../../../../../newgen/utils';
const constructAuthTokenUrlSpy = jest.spyOn(util, 'constructAuthTokenUrl');

import * as React from 'react';
import { ProcessedFileState } from '@uidu/media-core';
import { createContext } from '../../../_stubs';
import { Spinner } from '../../../../../newgen/loading';
import { DocViewer, Props } from '../../../../../newgen/viewers/doc/index';
import { ErrorMessage, createError } from '../../../../../newgen/error';
import Button from '@atlaskit/button';
import { mountWithIntlContext } from '@uidu/media-test-helpers';
import { BaseState } from '../../../../../newgen/viewers/base-viewer';
import { Content } from '../../../../../newgen/content';

function createFixture(
  fetchPromise: Promise<any>,
  item: ProcessedFileState,
  collectionName?: string,
) {
  const context = createContext(undefined as any);
  const onClose = jest.fn(() => fetchPromise);
  const el = mountWithIntlContext<Props, BaseState<Content>>(
    <DocViewer item={item} context={context} collectionName={collectionName} />,
  );
  (el as any).instance()['fetch'] = jest.fn();
  return { context, el, onClose };
}

const item: ProcessedFileState = {
  id: 'some-id',
  status: 'processed',
  name: 'my pdf',
  size: 11222,
  mediaType: 'video',
  mimeType: 'mp4',
  artifacts: {
    'document.pdf': {
      url: '/pdf',
      processingStatus: 'succeeded',
    },
  },
};

const itemWithNoArtifacts: ProcessedFileState = {
  ...item,
  artifacts: {},
};

describe('DocViewer', () => {
  afterEach(() => {
    constructAuthTokenUrlSpy.mockClear();
  });

  it('assigns a document content when successful', async () => {
    const fetchPromise = Promise.resolve();
    const { el } = createFixture(fetchPromise, item);
    await (el as any).instance()['init']();

    expect(el.state().content.status).toEqual('SUCCESSFUL');
  });

  it('shows an indicator while loading', async () => {
    const fetchPromise = new Promise(() => {});
    const { el } = createFixture(fetchPromise, item);
    await (el as any).instance()['init']();

    expect(el.find(Spinner)).toHaveLength(1);
  });

  it('shows an error message and download button if no artifact found', async () => {
    const fetchPromise = Promise.resolve(() => {});
    const { el } = createFixture(fetchPromise, itemWithNoArtifacts);

    await (el as any).instance()['init']();

    const { content } = el.state();
    expect(content.status).toEqual('FAILED');
    expect(content.err).toEqual(
      createError('noPDFArtifactsFound', undefined, itemWithNoArtifacts),
    );

    const errorMessage = el.find(ErrorMessage);
    expect(errorMessage).toHaveLength(1);
    expect(errorMessage.text()).toContain(
      'No PDF artifacts found for this file.',
    );

    // download button
    expect(errorMessage.text()).toContain(
      'Try downloading the file to view it',
    );
    expect(errorMessage.find(Button)).toHaveLength(1);
  });

  it('MSW-720: passes collectionName to constructAuthTokenUrl', async () => {
    const collectionName = 'some-collection';
    const fetchPromise = Promise.resolve();
    const { el } = createFixture(fetchPromise, item, collectionName);
    await (el as any).instance()['init']();
    expect(constructAuthTokenUrlSpy.mock.calls[0][2]).toEqual(collectionName);
  });
});
