jest.mock('../../../service/types');

import { Auth, ContextFactory } from '@uidu/media-core';
import { getMockClipboardEvent, MockFile } from '@uidu/media-test-helpers';
import { ClipboardImpl } from '../../clipboard';
import { UploadService, LocalFileSource } from '../../../service/types';
import { Clipboard } from '../../types';

const MockClipboardEvent = getMockClipboardEvent();
/**
 * Skipping all clipboard tests, failing due to mock keyboard events
 * TODO: JEST-23 Fix these tests
 */
describe.skip('Clipboard', () => {
  let clipboard: Clipboard;
  let addFilesWithSource: any;
  const context = ContextFactory.create({
    authProvider: () =>
      Promise.resolve<Auth>({
        clientId: '',
        token: '',
        baseUrl: '',
      }),
  });

  beforeEach(done => {
    clipboard = new ClipboardImpl(context);
    clipboard.activate();
    document.dispatchEvent(new Event('DOMContentLoaded'));

    addFilesWithSource = jest.fn();
    ((clipboard as any)
      .uploadService as UploadService).addFilesWithSource = addFilesWithSource;

    // necessary for dom ready listener
    window.setTimeout(done, 0);
  });

  afterEach(() => {
    clipboard.deactivate();
  });

  it('should call this.uploadService.addFilesWithSource() when a paste event is dispatched with a single file', () => {
    document.dispatchEvent(new MockClipboardEvent('paste', [new MockFile()]));
    expect(addFilesWithSource).toHaveBeenCalledTimes(1);
  });

  it('should call this.uploadService.addFilesWithSource() when a paste event is dispatched with multiple files', () => {
    const mockFile1 = new MockFile();
    const mockFile2 = new MockFile();
    document.dispatchEvent(
      new MockClipboardEvent('paste', [mockFile1, mockFile2]),
    );
    expect(addFilesWithSource).toHaveBeenCalledTimes(1);
    expect(
      addFilesWithSource.mock
        .calls /*1st call*/[0] /*1st arg*/[0] /*1st item*/[0].file,
    ).toEqual(mockFile1);
    expect(
      addFilesWithSource.mock
        .calls /*1st call*/[0] /*1st arg*/[0] /*2nd item*/[1].file,
    ).toEqual(mockFile2);
    expect(
      addFilesWithSource.mock
        .calls /*1st call*/[0] /*1st arg*/[0] /*1st item*/[0].source,
    ).toEqual(LocalFileSource.PastedFile);
    expect(
      addFilesWithSource.mock
        .calls /*1st call*/[0] /*1st arg*/[0] /*2nd item*/[1].source,
    ).toEqual(LocalFileSource.PastedFile);
  });

  it('should not call this.uploadService.addFilesWithSource() when deactivated and a paste event is dispatched a single file', () => {
    clipboard.deactivate();
    document.dispatchEvent(new MockClipboardEvent('paste', [new MockFile()]));
    expect(addFilesWithSource).toHaveBeenCalledTimes(0);
  });

  it('should not trigger errors when event.clipboardData is undefined', () => {
    const event = new MockClipboardEvent('paste', [new MockFile()]);
    delete event.clipboardData;
    document.dispatchEvent(event);
    expect(addFilesWithSource).toHaveBeenCalledTimes(0);
  });

  it('should detect pasted screenshots from clipboard event data', () => {
    const mockFile = new MockFile();
    document.dispatchEvent(
      new MockClipboardEvent('paste', [mockFile], ['some-type']),
    );
    expect(
      addFilesWithSource.mock
        .calls /*1st call*/[0] /*1st arg*/[0] /*1st item*/[0].file,
    ).toEqual(mockFile);
    expect(
      addFilesWithSource.mock
        .calls /*1st call*/[0] /*1st arg*/[0] /*1st item*/[0].source,
    ).toEqual(LocalFileSource.PastedScreenshot);
  });

  it('should detect pasted local files from clipboard event data', () => {
    const mockFile = new MockFile();
    document.dispatchEvent(new MockClipboardEvent('paste', [mockFile], []));
    expect(
      addFilesWithSource.mock
        .calls /*1st call*/[0] /*1st arg*/[0] /*1st item*/[0].file,
    ).toEqual(mockFile);
    expect(
      addFilesWithSource.mock
        .calls /*1st call*/[0] /*1st arg*/[0] /*1st item*/[0].source,
    ).toEqual(LocalFileSource.PastedFile);
  });
});
