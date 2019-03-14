import * as uuid from 'uuid';
import {
  Context,
  UploadableFile,
  MediaType,
  getMediaTypeFromMimeType,
  ContextFactory,
  fileStreamsCache,
} from '@uidu/media-core';
import {
  MediaStore,
  MediaStoreCopyFileWithTokenBody,
  UploadController,
  MediaStoreCopyFileWithTokenParams,
  MediaStoreResponse,
  MediaFile as MediaStoreMediaFile,
  TouchFileDescriptor,
  UploadableFileUpfrontIds,
} from '@uidu/media-store';
import { EventEmitter2 } from 'eventemitter2';
import { map } from 'rxjs/operators/map';
import { MediaFile } from '../domain/file';

import { RECENTS_COLLECTION } from '../popup/config';
import { mapAuthToSourceFileOwner } from '../popup/domain/source-file';
import { getPreviewFromImage } from '../util/getPreviewFromImage';
import { UploadParams } from '..';
import { SmartMediaProgress } from '../domain/progress';
import { MediaErrorName } from '../domain/error';
import {
  UploadService,
  UploadServiceEventListener,
  UploadServiceEventPayloadTypes,
} from './types';
import { LocalFileSource, LocalFileWithSource } from '../service/types';
import { getPreviewFromBlob } from '../util/getPreviewFromBlob';

export interface CancellableFileUpload {
  mediaFile: MediaFile;
  file: File;
  source: LocalFileSource;
  cancel?: () => void;
}

export class NewUploadServiceImpl implements UploadService {
  private readonly userMediaStore?: MediaStore;
  private readonly tenantMediaStore: MediaStore;
  private readonly userContext?: Context;
  private readonly emitter: EventEmitter2;
  private cancellableFilesUploads: { [key: string]: CancellableFileUpload };

  constructor(
    private readonly tenantContext: Context,
    private tenantUploadParams: UploadParams,
    private readonly shouldCopyFileToRecents: boolean,
  ) {
    this.emitter = new EventEmitter2();
    this.cancellableFilesUploads = {};
    const {
      authProvider: tenantAuthProvider,
      userAuthProvider,
    } = tenantContext.config;
    // We need a non user auth store, since we want to create the empty file in the public collection
    this.tenantMediaStore = new MediaStore({
      authProvider: tenantAuthProvider,
    });

    if (userAuthProvider) {
      this.userMediaStore = new MediaStore({
        authProvider: userAuthProvider,
      });

      // We need to use the userAuth to upload this file (recents)
      this.userContext = ContextFactory.create({
        userAuthProvider,
        authProvider: userAuthProvider,
      });
    }
  }

  setUploadParams(uploadParams: UploadParams): void {
    this.tenantUploadParams = uploadParams;
  }

  // Used for testing
  private createUploadController(): UploadController {
    return new UploadController();
  }

  addFiles(files: File[]): void {
    this.addFilesWithSource(
      files.map((file: File) => ({
        file,
        source: LocalFileSource.LocalUpload,
      })),
    );
  }

  addFilesWithSource(files: LocalFileWithSource[]): void {
    if (files.length === 0) {
      return;
    }

    const creationDate = Date.now();

    const { userContext, tenantContext, shouldCopyFileToRecents } = this;
    const context = shouldCopyFileToRecents ? tenantContext : userContext;
    const collection = shouldCopyFileToRecents
      ? this.tenantUploadParams.collection
      : RECENTS_COLLECTION;

    if (!context) {
      return;
    }

    const touchFileDescriptors: (TouchFileDescriptor & {
      occurrenceKey: string;
    })[] = [];
    for (let i = 0; i < files.length; i++) {
      touchFileDescriptors.push({
        fileId: uuid.v4(),
        occurrenceKey: uuid.v4(),
        collection,
      });
    }

    const promisedTouchFiles = context.file.touchFiles(
      touchFileDescriptors,
      collection,
    );

    const cancellableFileUploads: CancellableFileUpload[] = files.map(
      (fileWithSource, i) => {
        const { file, source } = fileWithSource;

        const { fileId: id, occurrenceKey } = touchFileDescriptors[i];
        const deferredUploadId = promisedTouchFiles.then(touchedFiles => {
          const touchedFile = touchedFiles.created.find(
            touchedFile => touchedFile.fileId === id,
          );
          if (!touchedFile) {
            throw new Error(
              'Cant retrieve uploadId from result of touch endpoint call',
            );
          }
          return touchedFile.uploadId;
        });

        const uploadableFile: UploadableFile = {
          collection,
          content: file,
          name: file.name,
          mimeType: file.type,
        };

        const uploadableUpfrontIds: UploadableFileUpfrontIds = {
          id,
          occurrenceKey,
          deferredUploadId,
        };

        const controller = this.createUploadController();
        const observable = context.file.upload(
          uploadableFile,
          controller,
          uploadableUpfrontIds,
        );

        let userUpfrontId: Promise<string> | undefined;
        let userOccurrenceKey: Promise<string> | undefined;
        let upfrontId = Promise.resolve(id);

        if (!shouldCopyFileToRecents) {
          const tenantOccurrenceKey = uuid.v4();
          const { collection } = this.tenantUploadParams;
          const options = {
            collection,
            occurrenceKey: tenantOccurrenceKey,
          };
          // We want to create an empty file in the tenant collection
          // TODO [MS-1355]: using context.file.touchFiles instead of createFile will speed up things
          // since we can lookup the id in the cache without wait for this to finish
          upfrontId = this.tenantMediaStore
            .createFile(options)
            .then(response => response.data.id);
          userUpfrontId = Promise.resolve(id);
          userOccurrenceKey = Promise.resolve(occurrenceKey);
        }

        const mediaFile: MediaFile = {
          id,
          upfrontId,
          userUpfrontId,
          userOccurrenceKey,
          name: file.name,
          size: file.size,
          creationDate,
          type: file.type,
          occurrenceKey,
        };
        const cancellableFileUpload: CancellableFileUpload = {
          mediaFile,
          file,
          source,
          cancel: () => {
            // we can't do "cancellableFileUpload.cancel = controller.abort" because will change the "this" context
            controller.abort();
          },
        };

        const subscription = observable.subscribe({
          next: state => {
            if (state.status === 'uploading') {
              this.onFileProgress(cancellableFileUpload, state.progress);
            }

            if (state.status === 'processing') {
              subscription.unsubscribe();

              this.onFileSuccess(cancellableFileUpload, id);
            }
          },
          error: error => {
            this.onFileError(mediaFile, 'upload_fail', error);
          },
        });

        this.cancellableFilesUploads[id] = cancellableFileUpload;
        // Save observable in the cache
        // We want to save the observable without collection too, due consumers using cards without collection.
        fileStreamsCache.set(id, observable);
        upfrontId.then(id => {
          // We assign the tenant id to the observable to not emit user id instead
          const tenantObservable = observable.pipe(
            map(file => ({
              ...file,
              id,
            })),
          );
          fileStreamsCache.set(id, tenantObservable);
        });

        return cancellableFileUpload;
      },
    );

    const mediaFiles = cancellableFileUploads.map(
      cancellableFileUpload => cancellableFileUpload.mediaFile,
    );

    this.emit('files-added', { files: mediaFiles });
    this.emitPreviews(cancellableFileUploads);
  }

  cancel(id?: string): void {
    if (id) {
      const cancellableFileUpload = this.cancellableFilesUploads[id];
      if (cancellableFileUpload && cancellableFileUpload.cancel) {
        cancellableFileUpload.cancel();
      }
    } else {
      Object.keys(this.cancellableFilesUploads).forEach(key => {
        const cancellableFileUpload = this.cancellableFilesUploads[key];
        if (cancellableFileUpload.cancel) {
          cancellableFileUpload.cancel();
        }
      });
    }
  }

  on<E extends keyof UploadServiceEventPayloadTypes>(
    event: E,
    listener: UploadServiceEventListener<E>,
  ): void {
    this.emitter.on(event, listener);
  }

  off<E extends keyof UploadServiceEventPayloadTypes>(
    event: E,
    listener: UploadServiceEventListener<E>,
  ): void {
    this.emitter.off(event, listener);
  }

  private readonly emit = <E extends keyof UploadServiceEventPayloadTypes>(
    event: E,
    payload: UploadServiceEventPayloadTypes[E],
  ): void => {
    this.emitter.emit(event, payload);
  };

  private emitPreviews(cancellableFileUploads: CancellableFileUpload[]) {
    cancellableFileUploads.forEach(cancellableFileUpload => {
      const { file, mediaFile, source } = cancellableFileUpload;
      const mediaType = this.getMediaTypeFromFile(file);
      if (mediaType === 'image') {
        getPreviewFromImage(
          file,
          source === LocalFileSource.PastedScreenshot
            ? window.devicePixelRatio
            : undefined,
        ).then(preview => {
          this.emit('file-preview-update', {
            file: mediaFile,
            preview,
          });
        });
      } else {
        getPreviewFromBlob(file, mediaType).then(preview => {
          this.emit('file-preview-update', {
            file: mediaFile,
            preview,
          });
        });
      }
    });
  }

  private getMediaTypeFromFile(file: File): MediaType {
    const { type } = file;

    return getMediaTypeFromMimeType(type);
  }

  private releaseCancellableFile(mediaFile: MediaFile): void {
    delete this.cancellableFilesUploads[mediaFile.id];
  }

  private readonly onFileSuccess = async (
    cancellableFileUpload: CancellableFileUpload,
    fileId: string,
  ) => {
    const { mediaFile } = cancellableFileUpload;

    this.copyFileToUsersCollection(fileId)
      // tslint:disable-next-line:no-console
      .catch(console.log); // We intentionally swallow these errors
    this.emit('file-converting', {
      file: mediaFile,
    });

    const details = {
      id: fileId,
    };

    this.emit('file-converted', {
      file: mediaFile,
      public: details,
    });

    cancellableFileUpload.cancel = () => {
      this.releaseCancellableFile(mediaFile);
    };
  };

  private readonly onFileProgress = (
    { mediaFile, file }: CancellableFileUpload,
    portion: number,
  ) => {
    const size = file.size;
    const progress = new SmartMediaProgress(
      size,
      size * portion,
      mediaFile.creationDate,
      Date.now(),
    );

    this.emit('file-uploading', {
      file: mediaFile,
      progress: progress.toJSON(),
    });
  };

  private readonly onFileError = (
    mediaFile: MediaFile,
    mediaErrorName: MediaErrorName,
    error: Error | string,
  ) => {
    this.releaseCancellableFile(mediaFile);
    if (error === 'canceled') {
      // Specific error coming from chunkinator via rejected fileId promise.
      // We do not want to trigger error in this case.
      return;
    }
    const description = error instanceof Error ? error.message : error;
    this.emit('file-upload-error', {
      file: mediaFile,
      error: {
        fileId: mediaFile.id,
        description: description,
        name: mediaErrorName,
      },
    });
  };

  // This method copies the file from the "tenant collection" to the "user collection" (recents).
  // that means we need "tenant auth" as input and "user auth" as output
  private copyFileToUsersCollection(
    sourceFileId: string,
  ): Promise<MediaStoreResponse<MediaStoreMediaFile> | void> {
    const {
      shouldCopyFileToRecents,
      userMediaStore,
      tenantUploadParams,
    } = this;
    if (!shouldCopyFileToRecents || !userMediaStore) {
      return Promise.resolve();
    }
    const { collection: sourceCollection } = tenantUploadParams;
    const { authProvider: tenantAuthProvider } = this.tenantContext.config;
    return tenantAuthProvider({ collectionName: sourceCollection }).then(
      auth => {
        const body: MediaStoreCopyFileWithTokenBody = {
          sourceFile: {
            id: sourceFileId,
            collection: sourceCollection,
            owner: {
              ...mapAuthToSourceFileOwner(auth),
            },
          },
        };
        const params: MediaStoreCopyFileWithTokenParams = {
          collection: RECENTS_COLLECTION,
        };

        return userMediaStore.copyFileWithToken(body, params);
      },
    );
  }
}
