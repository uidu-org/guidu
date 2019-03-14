import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import {
  asMock,
  expectFunctionToHaveBeenCalledWith,
  expectToEqual,
  fakeContext,
} from '@uidu/media-test-helpers';
import * as uuid from 'uuid';
import { Shortcut } from '@uidu/media-ui';
import Spinner  from '@uidu/spinner';
import {
  Context,
  FileState,
  UploadableFile,
  FileIdentifier,
} from '@uidu/media-core';
import { TouchedFiles, UploadableFileUpfrontIds } from '@uidu/media-store';
import {
  SmartMediaEditor,
  SmartMediaEditorProps,
  SmartMediaEditorState,
} from '../smartMediaEditor';

import { ReplaySubject } from 'rxjs/ReplaySubject';
import EditorView, { EditorViewProps } from '../editorView/editorView';
import ErrorView, { ErrorViewProps } from '../editorView/errorView/errorView';

describe('Smart Media Editor', () => {
  let fileIdPromise: Promise<string>;
  let fileId: string;
  let fileIdentifier: FileIdentifier;
  let onFinish: SmartMediaEditorProps['onFinish'];
  let onUploadStart: SmartMediaEditorProps['onUploadStart'];
  let context: Context;
  let component: ShallowWrapper<SmartMediaEditorProps, SmartMediaEditorState>;
  let givenFileStateObservable: ReplaySubject<FileState>;
  let formatMessage: jest.Mock<any>;

  beforeEach(() => {
    formatMessage = jest.fn();
    const fakeIntl: any = { formatMessage };
    fileId = 'some-file-id';
    fileIdPromise = Promise.resolve(fileId);
    fileIdentifier = {
      id: fileIdPromise,
      mediaItemType: 'file',
      collectionName: 'some-collection-name',
      occurrenceKey: 'some-occurrence-key',
    };
    onFinish = jest.fn();
    onUploadStart = jest.fn();
    context = fakeContext();
    givenFileStateObservable = new ReplaySubject<FileState>(1);
    asMock(context.file.getFileState).mockReturnValue(givenFileStateObservable);

    component = shallow(
      <SmartMediaEditor
        context={context}
        identifier={fileIdentifier}
        onFinish={onFinish}
        onUploadStart={onUploadStart}
        intl={fakeIntl}
      />,
    );

    jest
      .spyOn(uuid, 'v4')
      .mockReturnValueOnce('uuid1')
      .mockReturnValueOnce('uuid2')
      .mockReturnValueOnce('uuid3')
      .mockReturnValueOnce('uuid4');
  });

  it('should call onFinish when escape pressed', () => {
    const shortcut = component.find(Shortcut);
    const { keyCode, handler } = shortcut.props();
    expectToEqual(keyCode, 27);
    handler();
    expect(onFinish).toHaveBeenCalled();
  });

  it('should display spinner on initial render', () => {
    expect(component.find(Spinner)).toHaveLength(1);
  });

  it('should call getFileState for given file', async () => {
    const { collectionName, occurrenceKey } = fileIdentifier;
    await fileIdPromise;
    expectFunctionToHaveBeenCalledWith(context.file.getFileState, [
      fileId,
      {
        collectionName,
        occurrenceKey,
      },
    ]);
  });

  const forFileToBeProcessed = async () => {
    const imageUrlPromise = Promise.resolve('some-image-url');
    asMock(context.getImageUrl).mockReturnValue(imageUrlPromise);
    givenFileStateObservable.next({
      status: 'processed',
      id: fileId,
      occurrenceKey: 'some-occurrence-key',
      mediaType: 'image',
      mimeType: 'image/gif',
      name: 'some-name',
      size: 42,
      artifacts: {},
    });
    await fileIdPromise;
    await imageUrlPromise;
    component.update();
  };

  describe('when incoming file is processed', () => {
    beforeEach(async () => {
      await forFileToBeProcessed();
    });

    it('should render EditorView', async () => {
      const editorView = component.find<EditorViewProps>(EditorView);
      expect(editorView).toHaveLength(1);
      const { imageUrl } = editorView.props();
      expectToEqual(imageUrl, 'some-image-url');
    });

    it('should call context.getImageUrl', () => {
      expectFunctionToHaveBeenCalledWith(context.getImageUrl, [
        fileId,
        {
          collection: fileIdentifier.collectionName,
          mode: 'full-fit',
        },
      ]);
    });

    it('should not listen for farther file states', async () => {
      // Wait for observable unsubscription
      await new Promise(resolve => setTimeout(resolve, 0));
      givenFileStateObservable.next({
        status: 'error',
        id: fileId,
        occurrenceKey: 'some-occurrence-key',
      });
      component.update();
      expect(component.find('ErrorView')).toHaveLength(0);
      expect(component.find(EditorView)).toHaveLength(1);
    });
  });

  describe('when EditorView calls onSave callback', () => {
    let resultingFileStateObservable: ReplaySubject<FileState>;
    beforeEach(async () => {
      await forFileToBeProcessed();
      resultingFileStateObservable = new ReplaySubject<FileState>(1);
      const touchedFiles: TouchedFiles = {
        created: [
          {
            fileId: 'some-file-id',
            uploadId: 'some-upload-id',
          },
        ],
      };
      asMock(context.file.touchFiles).mockResolvedValue(touchedFiles);
      asMock(context.file.upload).mockReturnValue(resultingFileStateObservable);
      const editorView = component.find<EditorViewProps>(EditorView);
      const { onSave } = editorView.props();
      onSave('some-image-content');
    });

    it('should upload a file', async () => {
      // First we touch files with client generated id
      expectFunctionToHaveBeenCalledWith(context.file.touchFiles, [
        [
          {
            fileId: 'uuid1',
            collection: fileIdentifier.collectionName,
          },
        ],
        fileIdentifier.collectionName,
      ]);

      // Then we call upload
      const expectedUploadableFile: UploadableFile = {
        content: 'some-image-content',
        name: 'some-name',
        collection: fileIdentifier.collectionName,
      };
      const expectedUploadableFileUpfrontIds: UploadableFileUpfrontIds = {
        id: 'uuid1',
        deferredUploadId: expect.anything(),
        occurrenceKey: 'some-occurrence-key',
      };
      expectFunctionToHaveBeenCalledWith(context.file.upload, [
        expectedUploadableFile,
        undefined,
        expectedUploadableFileUpfrontIds,
      ]);
      const actualUploadableFileUpfrontIds: UploadableFileUpfrontIds = asMock(
        context.file.upload,
      ).mock.calls[0][2];
      const actualUploadId = await actualUploadableFileUpfrontIds.deferredUploadId;
      expectToEqual(actualUploadId, 'some-upload-id');

      // In the end we exit synchronously with new identifier
      expectFunctionToHaveBeenCalledWith(onUploadStart, [
        {
          mediaItemType: 'file',
          id: 'uuid1',
          collectionName: fileIdentifier.collectionName,
        },
      ]);
    });

    it('should call onFinish when new file fully uploaded (processing)', async () => {
      resultingFileStateObservable.next({
        status: 'processing',
        id: 'uuid1',
        mediaType: 'image',
        mimeType: 'image/gif',
        name: 'some-name',
        size: 42,
      });
      await new Promise(resolve => setTimeout(resolve, 0));
      resultingFileStateObservable.next({
        status: 'processing',
        id: 'uuid1',
        mediaType: 'image',
        mimeType: 'image/gif',
        name: 'some-name',
        size: 42,
      });
      expect(onFinish).toHaveBeenCalledTimes(1);
    });

    it('should show error screen when processing-failed', async () => {
      asMock(formatMessage).mockReturnValue('Error message');
      resultingFileStateObservable.next({
        status: 'failed-processing',
        id: 'uuid1',
        mediaType: 'image',
        mimeType: 'image/gif',
        name: 'some-name',
        size: 42,
        artifacts: [],
      });
      component.update();
      expect(component.find(EditorView)).toHaveLength(0);
      expect(component.find(ErrorView)).toHaveLength(1);
      const errorViewProps = component.find<ErrorViewProps>(ErrorView).props();
      expectToEqual(errorViewProps.message, 'Error message');
    });

    it('should show error screen when error', async () => {
      asMock(formatMessage).mockReturnValue('Error message');
      resultingFileStateObservable.next({
        status: 'error',
        id: 'uuid1',
      });
      component.update();
      expect(component.find(EditorView)).toHaveLength(0);
      expect(component.find(ErrorView)).toHaveLength(1);
      const errorViewProps = component.find<ErrorViewProps>(ErrorView).props();
      expectToEqual(errorViewProps.message, 'Error message');
    });

    it('should close editor when error is dismissed', () => {
      resultingFileStateObservable.next({
        status: 'failed-processing',
        id: 'uuid1',
        mediaType: 'image',
        mimeType: 'image/gif',
        name: 'some-name',
        size: 42,
        artifacts: [],
      });
      component.update();
      const errorViewProps = component.find<ErrorViewProps>(ErrorView).props();
      errorViewProps.onCancel();
      expect(onFinish).toHaveBeenCalled();
    });
  });
});
