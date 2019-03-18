const itemViewerModule = require.requireActual(
  '../../../newgen/analytics/item-viewer',
);
const mediaPreviewFailedEventSpy = jest.fn();
const mockItemViewer = {
  ...itemViewerModule,
  mediaPreviewFailedEvent: mediaPreviewFailedEventSpy,
};
jest.mock('../../../newgen/analytics/item-viewer', () => mockItemViewer);

import * as React from 'react';
import { mount } from 'enzyme';
import { ErrorMessage, createError } from '../../../newgen/error';
import Button from '@uidu/button';
import { fakeIntl } from '@uidu/media-test-helpers';

describe('Error Message', () => {
  it('should render the right error for retrieving metadata', () => {
    const el = mount(
      <ErrorMessage intl={fakeIntl} error={createError('metadataFailed')} />,
    );
    expect(el.text()).toContain(
      'Something went wrong.It might just be a hiccup.',
    );
  });

  it('should render the right error for generating a preview', () => {
    const el = mount(
      <ErrorMessage intl={fakeIntl} error={createError('previewFailed')} />,
    );
    expect(el.text()).toContain("We couldn't generate a preview for this file");
  });

  it('should render the right error when the id is not found', () => {
    const el = mount(
      <ErrorMessage intl={fakeIntl} error={createError('idNotFound')} />,
    );
    expect(el.text()).toContain('The selected item was not found on the list');
  });

  it('should render the right error when the PDF artifact does not exist', () => {
    const el = mount(
      <ErrorMessage
        intl={fakeIntl}
        error={createError('noPDFArtifactsFound')}
      />,
    );
    expect(el.text()).toContain('No PDF artifacts found for this file');
  });

  it('should render the right error when the file type is unsupported', () => {
    const el = mount(
      <ErrorMessage intl={fakeIntl} error={createError('unsupported')} />,
    );
    expect(el.text()).toContain("We can't preview this file type.");
  });

  it('should render a child component', () => {
    const el = mount(
      <ErrorMessage intl={fakeIntl} error={createError('unsupported')}>
        <Button />
      </ErrorMessage>,
    );
    expect(el.find(Button)).toHaveLength(1);
  });

  it('should trigger analytics when displayed', () => {
    mount(
      <ErrorMessage intl={fakeIntl} error={createError('unsupported')}>
        <Button />
      </ErrorMessage>,
    );
    expect(mediaPreviewFailedEventSpy).toHaveBeenCalledWith(
      'unsupported',
      undefined,
    );
  });
});
