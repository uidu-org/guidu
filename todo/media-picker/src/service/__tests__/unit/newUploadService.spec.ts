jest.mock('../../../util/getPreviewFromBlob');
jest.mock('../../../util/getPreviewFromImage');

import {
  ContextFactory,
  AuthProvider,
  ContextConfig,
  UploadableFile,
  Context,
  Auth,
  fileStreamsCache,
  FileState,
} from '@uidu/media-core';
import { TouchedFiles } from '@uidu/media-store';
import * as uuid from 'uuid';
import { asMock, fakeContext } from '@uidu/media-test-helpers';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs';
import { NewUploadServiceImpl } from '../../newUploadServiceImpl';
import { MediaFile, UploadParams } from '../../..';
import * as getPreviewModule from '../../../util/getPreviewFromBlob';
import * as getPreviewFromImage from '../../../util/getPreviewFromImage';
import { Preview } from '../../../domain/preview';
import {
  UploadPreviewUpdateEventPayload,
  UploadsStartEventPayload,
} from '../../../domain/uploadEvent';

const fileStreamCacheSpy = jest.spyOn(fileStreamsCache, 'set');

describe('UploadService', () => {
  const baseUrl = 'some-api-url';
  const clientId = 'some-client-id';
  const token = 'some-token';
  const upfrontId = Promise.resolve('1');
  let authProvider: AuthProvider;
  const usersClientId = 'some-users-collection-client-id';
  const usersToken = 'some-users-collection-client-id';
  const previewObject: Preview = { someImagePreview: true } as any;
  const userAuthProvider: AuthProvider = () =>
    Promise.resolve({
      clientId: usersClientId,
      token: usersToken,
      baseUrl,
    });
  const getContext = (options = {}) =>
    ContextFactory.create({
      authProvider,
      ...options,
    });
  const file = { size: 100, name: 'some-filename', type: 'video/mp4' } as File;
  const setup = (
    context: Context = getContext(),
    tenantUploadParams: UploadParams = { collection: '' },
    shouldCopyFileToRecents: boolean = true,
  ) => {
    const touchedFiles: TouchedFiles = {
      created: [
        {
          fileId: 'uuid1',
          uploadId: 'some-upload-id-uuid1',
        },
        {
          fileId: 'uuid2',
          uploadId: 'some-upload-id-uuid2',
        },
        {
          fileId: 'uuid3',
          uploadId: 'some-upload-id-uuid3',
        },
        {
          fileId: 'uuid4',
          uploadId: 'some-upload-id-uuid4',
        },
      ],
    };
    jest.spyOn(context.file, 'touchFiles').mockResolvedValue(touchedFiles);
    jest.spyOn(context.file, 'upload').mockReturnValue({
      subscribe() {},
    });

    (getPreviewFromImage.getPreviewFromImage as any).mockReturnValue(
      Promise.resolve(previewObject),
    );

    const uploadService = new NewUploadServiceImpl(
      context,
      tenantUploadParams,
      shouldCopyFileToRecents,
    );

    jest
      .spyOn((uploadService as any).tenantMediaStore, 'createFile')
      .mockResolvedValue({ data: { id: 'some-new-tenant-file-id' } });

    const filesAddedPromise = new Promise(resolve =>
      uploadService.on('files-added', () => resolve()),
    );

    if (context.config.userAuthProvider) {
      jest
        .spyOn((uploadService as any).userMediaStore, 'createFile')
        .mockResolvedValue({ data: { id: 'some-new-user-file-id' } });
      const userContext: Context = (uploadService as any)['userContext'];
      jest
        .spyOn(userContext.file, 'touchFiles')
        .mockResolvedValue(touchedFiles);
      const userContextUpload = jest.spyOn(userContext.file, 'upload');
      userContextUpload.mockReturnValue({
        subscribe() {},
      });

      return { uploadService, filesAddedPromise, context, userContext };
    } else {
      return { uploadService, filesAddedPromise, context };
    }
  };

  beforeEach(() => {
    authProvider = jest.fn(() =>
      Promise.resolve<Auth>({ clientId, token, baseUrl }),
    );
    fileStreamCacheSpy.mockReset();
    (getPreviewModule.getPreviewFromBlob as any).mockReset();
    (getPreviewModule.getPreviewFromBlob as any).mockReturnValue(
      Promise.resolve(),
    );
    jest
      .spyOn(uuid, 'v4')
      .mockReturnValueOnce('uuid1')
      .mockReturnValueOnce('uuid2')
      .mockReturnValueOnce('uuid3')
      .mockReturnValueOnce('uuid4');
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('setUploadParams', () => {
    const setup = () => ({
      uploadService: new NewUploadServiceImpl(getContext(), {}, false),
    });

    it('should set new uploadParams', () => {
      const { uploadService } = setup();

      uploadService.setUploadParams({
        collection: 'new-collection',
      });

      expect(uploadService['tenantUploadParams']).toEqual({
        collection: 'new-collection',
      });
    });
  });

  describe('addFiles', () => {
    it('should emit file-preview-update for video files', async () => {
      const { uploadService, filesAddedPromise } = setup();

      const callback = jest.fn();
      uploadService.on('file-preview-update', callback);

      const previewObject: Preview = { someImagePreview: true } as any;
      (getPreviewModule.getPreviewFromBlob as any).mockReturnValue(
        Promise.resolve(previewObject),
      );

      uploadService.addFiles([file]);
      await filesAddedPromise;
      const expectedPayload: UploadPreviewUpdateEventPayload = {
        file: {
          creationDate: expect.any(Number),
          id: expect.any(String),
          name: 'some-filename',
          size: 100,
          type: 'video/mp4',
          upfrontId,
          occurrenceKey: expect.any(String),
          userUpfrontId: undefined,
          userOccurrenceKey: undefined,
        },
        preview: previewObject,
      };
      expect(callback).toHaveBeenCalledWith(expectedPayload);
    });

    it('should emit file-preview-update for image files', async () => {
      const { uploadService, filesAddedPromise } = setup();
      const file = { size: 100, name: 'some-filename', type: 'image/png' };

      const callback = jest.fn();
      uploadService.on('file-preview-update', callback);

      uploadService.addFiles([file as File]);
      await filesAddedPromise;
      const expectedPayload: UploadPreviewUpdateEventPayload = {
        file: {
          creationDate: expect.any(Number),
          id: expect.any(String),
          name: 'some-filename',
          size: 100,
          type: 'image/png',
          upfrontId,
          occurrenceKey: expect.any(String),
          userUpfrontId: undefined,
          userOccurrenceKey: undefined,
        },
        preview: previewObject,
      };
      expect(callback).toHaveBeenCalledWith(expectedPayload);
    });

    it('should use getPreviewFromBlob for non-image files when emitting preview', async () => {
      const { uploadService, filesAddedPromise } = setup();
      const file = { size: 100, name: 'some-filename', type: 'video/mp4' };

      const callback = jest.fn();
      uploadService.on('file-preview-update', callback);

      (getPreviewModule.getPreviewFromBlob as any).mockReturnValue(
        Promise.resolve({ someImagePreview: true }),
      );

      uploadService.addFiles([file as File]);
      await filesAddedPromise;

      expect(getPreviewModule.getPreviewFromBlob).toHaveBeenCalledWith(
        file,
        'video',
      );
    });

    it('should not emit files-added if files is empty list', () => {
      const { uploadService } = setup();
      const filesAddedCallback = jest.fn();
      uploadService.on('files-added', filesAddedCallback);
      uploadService.addFiles([]);
      expect(filesAddedCallback).not.toHaveBeenCalled();
    });

    it('should emit files-added event with correct payload when addFiles() is called with multiple files', () => {
      const { uploadService } = setup();
      const currentTimestamp = Date.now();
      const file2: File = {
        size: 10e7,
        name: 'some-other-filename',
        type: 'image/png',
      } as any;

      const filesAddedCallback = jest.fn();
      uploadService.on('files-added', filesAddedCallback);

      uploadService.addFiles([file, file2]);
      const expectedPayload: UploadsStartEventPayload = {
        files: [
          {
            id: expect.any(String),
            creationDate: expect.any(Number),
            name: 'some-filename',
            size: 100,
            type: 'video/mp4',
            upfrontId,
            occurrenceKey: expect.any(String),
            userUpfrontId: undefined,
            userOccurrenceKey: undefined,
          },
          {
            id: expect.any(String),
            creationDate: expect.any(Number),
            name: 'some-other-filename',
            size: 100000000,
            type: 'image/png',
            upfrontId,
            occurrenceKey: expect.any(String),
            userUpfrontId: undefined,
            userOccurrenceKey: undefined,
          },
        ],
      };
      expect(filesAddedCallback).toHaveBeenCalledWith(expectedPayload);
      expect(filesAddedCallback.mock.calls[0][0].files[0].id).not.toEqual(
        filesAddedCallback.mock.calls[0][0].files[1].id,
      );
      expect(
        filesAddedCallback.mock.calls[0][0].files[0].creationDate,
      ).toBeGreaterThanOrEqual(currentTimestamp);
      expect(
        filesAddedCallback.mock.calls[0][0].files[1].creationDate,
      ).toBeGreaterThanOrEqual(currentTimestamp);
    });

    it('should call upload for each given file', () => {
      const file2: File = {
        size: 10e7,
        name: 'some-other-filename',
        type: 'image/png',
      } as any;
      const { context, uploadService } = setup(undefined, {
        collection: 'some-collection',
      });
      uploadService.addFiles([file, file2]);
      expect(context.file.upload).toHaveBeenCalledTimes(2);
      const expectedUploadableFile2: UploadableFile = {
        collection: 'some-collection',
        content: file2,
        name: 'some-other-filename',
        mimeType: 'image/png',
      };
      const expectedUploadableFile1: UploadableFile = {
        collection: 'some-collection',
        content: file,
        name: 'some-filename',
        mimeType: 'video/mp4',
      };
      expect(asMock(context.file.upload).mock.calls[0][0]).toEqual(
        expectedUploadableFile1,
      );
      expect(asMock(context.file.upload).mock.calls[1][0]).toEqual(
        expectedUploadableFile2,
      );
    });

    it.skip('should emit file-converting when uploadFile resolves', async () => {
      const context = getContext();
      const { uploadService } = setup(context, {
        collection: 'some-collection',
      });
      const fileConvertingCallback = jest.fn();
      uploadService.on('file-converting', fileConvertingCallback);
      jest.spyOn(context.file, 'upload').mockReturnValue(
        new Observable(observer => {
          window.setTimeout(() => {
            observer.next({
              status: 'processing',
              id: 'public-file-id',
            });
          });
        }),
      );
      uploadService.addFiles([file]);
      window.setTimeout(() => {
        expect(fileConvertingCallback).toHaveBeenCalledTimes(1);
        expect(fileConvertingCallback).toHaveBeenCalledWith({
          file: {
            publicId: 'public-file-id',
            id: expect.any(String),
            creationDate: expect.any(Number),
            name: 'some-filename',
            size: 100,
            type: 'video/mp4',
            upfrontId,
          },
        });
      });
    });

    it.skip('should call emit "file-uploading" when it receives an onProgress event from Context.file#upload()', () => {
      const context = getContext();
      const { uploadService } = setup(context, {
        collection: 'some-collection',
      });

      jest.spyOn(context.file, 'upload').mockReturnValue({
        subscribe(subscription: Subscriber<FileState>) {
          subscription.next({
            status: 'uploading',
            id: 'public-file-id',
            name: 'some-file-name',
            size: 100,
            progress: 0.42,
            mediaType: 'image',
            mimeType: 'image/png',
          });
        },
      });

      const fileUploadingCallback = jest.fn();
      uploadService.on('file-uploading', fileUploadingCallback);

      uploadService.addFiles([file]);
      const expectedMediaFile: MediaFile = {
        id: expect.any(String),
        creationDate: expect.any(Number),
        name: 'some-filename',
        size: 100,
        type: 'video/mp4',
        upfrontId,
      };
      expect(fileUploadingCallback).toHaveBeenCalledWith({
        file: expectedMediaFile,
        progress: expect.objectContaining({
          absolute: 42,
          max: 100,
          portion: 0.42,
        }),
      });
    });

    it.skip('should emit "file-upload-error" when uploadFile fail', () => {
      const context = getContext();
      const { uploadService } = setup(context, {
        collection: 'some-collection',
      });
      const fileUploadErrorCallback = jest.fn();
      uploadService.on('file-upload-error', fileUploadErrorCallback);

      jest.spyOn(context.file, 'upload').mockReturnValue({
        subscribe(subscription: Subscriber<FileState>) {
          // window.setTimeout(() => {
          subscription.error('Some reason');
          // }, 10)
        },
      });

      uploadService.addFiles([file]);

      const expectedMediaFile: MediaFile = {
        id: expect.any(String),
        creationDate: expect.any(Number),
        name: 'some-filename',
        size: 100,
        type: 'video/mp4',
        upfrontId,
      };
      expect(fileUploadErrorCallback).toHaveBeenCalledWith({
        file: expectedMediaFile,
        error: {
          fileId: expect.any(String),
          name: 'upload_fail',
          description: 'Some reason',
        },
      });
    });
  });

  describe('#cancel()', () => {
    it('should cancel specific upload', () => {
      const file: File = {
        size: 100,
        name: 'some-filename',
        type: 'doc',
      } as any;
      const { uploadService } = setup();
      const abort = jest.fn();
      (uploadService as any).createUploadController = () => ({ abort });

      const filesAddedCallback = jest.fn();
      uploadService.on('files-added', filesAddedCallback);

      uploadService.addFiles([file]);

      const generatedId = filesAddedCallback.mock.calls[0][0].files[0].id;
      uploadService.cancel(generatedId);
      expect(abort).toHaveBeenCalled();
    });

    it('should cancel all uploads when #cancel is not passed any arguments', () => {
      const file1: File = {
        size: 100,
        name: 'some-filename',
        type: 'doc',
      } as any;
      const file2: File = {
        size: 10e7,
        name: 'some-other-filename',
        type: 'image/png',
      } as any;
      const { uploadService } = setup();
      const createUploadController = jest.fn().mockReturnValue({ abort() {} });
      (uploadService as any).createUploadController = createUploadController;

      const filesAddedCallback = jest.fn();

      uploadService.on('files-added', filesAddedCallback);
      uploadService.addFiles([file1, file2]);
      uploadService.cancel();
      expect(createUploadController).toHaveBeenCalledTimes(2);
    });

    it.skip('should release cancellableFilesUpload after file failed to upload', () => {
      const file: File = {
        size: 100,
        name: 'some-filename',
        type: 'doc',
      } as any;

      const context = getContext();
      const { uploadService } = setup(context);

      const filesAddedCallback = jest.fn();
      uploadService.on('files-added', filesAddedCallback);

      return new Promise(resolve => {
        jest.spyOn(context.file, 'upload').mockReturnValue({
          subscribe(subscription: Subscriber<FileState>) {
            subscription.error();
            expect(
              Object.keys((uploadService as any).cancellableFilesUploads),
            ).toHaveLength(0);
            resolve();
          },
        });

        uploadService.addFiles([file]);
        expect(
          Object.keys((uploadService as any).cancellableFilesUploads),
        ).toHaveLength(1);
      });
    });
  });

  // TODO it seems quite strange that we are testing a private method here. (MSW-691)
  // we should tease this out into a separate module/class
  describe('#copyFileToUsersCollection()', () => {
    const setup = (config: {
      uploadParams?: UploadParams;
      progress?: number;
      userAuthProvider?: AuthProvider;
      copyFileWithTokenSpy: Function;
    }) => {
      const clientBasedConfig: ContextConfig = {
        authProvider,
      };

      const context = fakeContext(
        {},
        { ...clientBasedConfig, userAuthProvider: config.userAuthProvider },
      );

      const collectionNameStub = 'some-collection-name';
      const uploadService = new NewUploadServiceImpl(
        context,
        { collection: collectionNameStub },
        true,
      );
      (uploadService as any).userMediaStore = config.userAuthProvider && {
        copyFileWithToken: config.copyFileWithTokenSpy,
      };

      const sourceFileId = 'some-source-file-id';
      return {
        uploadService,
        authProvider: context.config.authProvider,
        sourceFileId,
        sourceFileCollection: collectionNameStub,
      };
    };

    it('resolves immediately when userAuthProvider was not passed in to UploadService constructor', () => {
      const copyFileWithTokenSpy = jest
        .fn()
        .mockReturnValue(Promise.resolve('some-upload-id'));

      const { uploadService, sourceFileId } = setup({
        copyFileWithTokenSpy,
      });

      return uploadService['copyFileToUsersCollection'](sourceFileId).then(
        () => {
          expect(copyFileWithTokenSpy).not.toHaveBeenCalled();
        },
      );
    });

    it('calls the authProvider with the sourceCollection', () => {
      const copyFileWithTokenSpy = () => Promise.resolve('some-upload-id');
      const {
        uploadService,
        authProvider,
        sourceFileId,
        sourceFileCollection,
      } = setup({
        userAuthProvider,
        copyFileWithTokenSpy,
      });

      return uploadService['copyFileToUsersCollection'](sourceFileId).then(
        () => {
          expect(authProvider).toHaveBeenCalledWith({
            collectionName: sourceFileCollection,
          });
        },
      );
    });

    it('resolves with api#copyFileToCollection response when userAuthProvider was passed into UploadService', () => {
      const copyFileWithTokenSpy = jest
        .fn()
        .mockReturnValue(Promise.resolve('some-MediaApi-response'));

      const { uploadService, sourceFileId } = setup({
        userAuthProvider,
        copyFileWithTokenSpy,
      });

      return uploadService['copyFileToUsersCollection'](sourceFileId).then(
        response => {
          expect(response).toEqual('some-MediaApi-response');
        },
      );
    });

    it('rejects with api#copyFileToCollection rejection when authProvider resolves', () => {
      const copyFileToCollectionRejection = new Error('some-error');
      const copyFileWithTokenSpy = jest
        .fn()
        .mockReturnValue(Promise.reject(copyFileToCollectionRejection));

      const { uploadService, sourceFileId } = setup({
        userAuthProvider,
        copyFileWithTokenSpy,
      });

      const fileUploadErrorCallback = jest.fn();
      uploadService.on('file-upload-error', fileUploadErrorCallback);

      return uploadService['copyFileToUsersCollection'](sourceFileId).then(
        () => expect(true).toBe(false),
        (error: Error) => {
          expect(error).toEqual(copyFileToCollectionRejection);
          expect(fileUploadErrorCallback).not.toHaveBeenCalled();
        },
      );
    });

    it('resolves when userAuthProvider fails', () => {
      const userAuthProvider = () => Promise.reject(new Error('some-error'));

      const copyFileWithTokenSpy = jest
        .fn()
        .mockReturnValue(Promise.resolve('some-MediaApi-response'));

      const { uploadService, sourceFileId } = setup({
        userAuthProvider,
        copyFileWithTokenSpy,
      });

      const fileUploadErrorCallback = jest.fn();
      uploadService.on('file-upload-error', fileUploadErrorCallback);

      return uploadService['copyFileToUsersCollection'](sourceFileId).catch(
        error => {
          expect(error).toEqual(new Error('some-error'));
          expect(fileUploadErrorCallback).toHaveBeenCalledWith({
            file: {
              id: 'some-id-42',
              creationDate: 1234,
              name: 'some-name',
              size: 4200,
              type: 'some-type',
            },
            error: {
              fileId: 'some-id-42',
              name: 'token_fetch_fail',
              description: 'some-error',
            },
          });
        },
      );
    });
  });

  describe('upfront id', () => {
    it('should use tenantContext context to upload file when shouldCopyFileToRecents=true', () => {
      const { uploadService, context } = setup(undefined, undefined, true);

      uploadService.addFiles([file]);
      expect(context.file.upload).toHaveBeenCalledTimes(1);
    });

    it('should use userContext context to upload file when shouldCopyFileToRecents=false', () => {
      const context = getContext({ userAuthProvider });
      const { uploadService, userContext } = setup(context, {}, false);

      uploadService.addFiles([file]);
      expect(userContext!.file.upload).toHaveBeenCalledTimes(1);
    });

    it('should populate fileStreamsCache once we have the upfront id', async () => {
      const { uploadService } = setup(undefined, {
        collection: 'some-collection',
      });
      uploadService.addFiles([file]);

      expect(fileStreamCacheSpy).toHaveBeenCalledTimes(1);
      expect(fileStreamCacheSpy.mock.calls[0][0]).toBe('uuid1');
    });
  });
});
