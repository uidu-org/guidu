import { Observable } from 'rxjs/Observable';
import { ConnectableObservable } from 'rxjs/Observable/ConnectableObservable';
import { Observer } from 'rxjs/Observer';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { publishReplay } from 'rxjs/operators/publishReplay';
import uuid from 'uuid/v4';
import Dataloader from 'dataloader';
import {
  MediaStore,
  UploadableFile,
  UploadController,
  uploadFile,
  MediaCollectionItemFullDetails,
  FileItem,
  MediaFileArtifacts,
  TouchFileDescriptor,
  TouchedFiles,
  UploadableFileUpfrontIds,
} from '@uidu/media-store';
// import * as isValidId from 'uuid-validate';
import {
  FilePreview,
  FileState,
  GetFileOptions,
  mapMediaItemToFileState,
} from '../fileState';
import { fileStreamsCache } from '../context/fileStreamCache';
import { getMediaTypeFromUploadableFile } from '../utils/getMediaTypeFromUploadableFile';
import { convertBase64ToBlob } from '../utils/convertBase64ToBlob';

const POLLING_INTERVAL = 1000;
const maxNumberOfItemsPerCall = 100;
const makeCacheKey = (id: string, collection?: string) =>
  collection ? `${id}-${collection}` : id;

export type DataloaderMap = { [id: string]: DataloaderResult };
export const getItemsFromKeys = (
  dataloaderKeys: DataloaderKey[],
  fileItems: FileItem[],
): DataloaderResult[] => {
  const itemsByKey: DataloaderMap = fileItems.reduce(
    (prev: DataloaderMap, nextFileItem) => {
      const { id, collection } = nextFileItem;
      const key = makeCacheKey(id, collection);
      prev[key] = nextFileItem.details;

      return prev;
    },
    {},
  );

  return dataloaderKeys.map(dataloaderKey => {
    const { id, collection } = dataloaderKey;
    const key = makeCacheKey(id, collection);
    return itemsByKey[key];
  });
};

interface DataloaderKey {
  id: string;
  collection?: string;
}

type DataloaderResult = MediaCollectionItemFullDetails | undefined;

export interface FileFetcher {
  getFileState(id: string, options?: GetFileOptions): Observable<FileState>;
  getArtifactURL(
    artifacts: MediaFileArtifacts,
    artifactName: keyof MediaFileArtifacts,
    collectionName?: string,
  ): Promise<string>;
  touchFiles(
    descriptors: TouchFileDescriptor[],
    collection?: string,
  ): Promise<TouchedFiles>;
  upload(
    file: UploadableFile,
    controller?: UploadController,
    uploadableFileUpfrontIds?: UploadableFileUpfrontIds,
  ): Observable<FileState>;
  downloadBinary(
    id: string,
    name?: string,
    collectionName?: string,
  ): Promise<void>;
  getCurrentState(id: string): Promise<FileState>;
}

export class FileFetcherImpl implements FileFetcher {
  private readonly dataloader: Dataloader<DataloaderKey, DataloaderResult>;

  constructor(private readonly mediaStore: MediaStore) {
    this.dataloader = new Dataloader<DataloaderKey, DataloaderResult>(
      this.batchLoadingFunc,
      {
        maxBatchSize: maxNumberOfItemsPerCall,
      },
    );
  }

  // Returns an array of the same length as the keys filled with file items
  private batchLoadingFunc = async (keys: DataloaderKey[]) => {
    const nonCollectionName = '__media-single-file-collection__';
    const fileIdsByCollection = keys.reduce(
      (prev, next) => {
        const collectionName = next.collection || nonCollectionName;
        const fileIds = prev[collectionName] || [];

        fileIds.push(next.id);
        prev[collectionName] = fileIds;

        return prev;
      },
      {} as { [collectionName: string]: string[] },
    );
    const items: FileItem[] = [];

    await Promise.all(
      Object.keys(fileIdsByCollection).map(async collectionNameKey => {
        const fileIds = fileIdsByCollection[collectionNameKey];
        const collectionName =
          collectionNameKey === nonCollectionName
            ? undefined
            : collectionNameKey;
        const response = await this.mediaStore.getItems(
          fileIds,
          collectionName,
        );

        items.push(...response.data.items);
      }),
    );
    return getItemsFromKeys(keys, items);
  };

  public getFileState(
    id: string,
    options?: GetFileOptions,
  ): Observable<FileState> {
    // if (!isValidId(id)) {
    //   return Observable.create((observer: Observer<FileState>) => {
    //     observer.error(`${id} is not a valid file id`);
    //   });
    // }

    return fileStreamsCache.getOrInsert(id, () => {
      const collection = options && options.collectionName;
      const fileStream$ = publishReplay<FileState>(1)(
        this.createDownloadFileStream(id, collection),
      ) as ConnectableObservable<FileState>;

      fileStream$.connect();

      return fileStream$;
    });
  }

  getCurrentState(id: string): Promise<FileState> {
    return fileStreamsCache.getCurrentState(id);
  }

  public getArtifactURL(
    artifacts: MediaFileArtifacts,
    artifactName: keyof MediaFileArtifacts,
    collectionName?: string,
  ): Promise<string> {
    return this.mediaStore.getArtifactURL(
      artifacts,
      artifactName,
      collectionName,
    );
  }

  private createDownloadFileStream = (
    id: string,
    collection?: string,
  ): Observable<FileState> => {
    return Observable.create(async (observer: Observer<FileState>) => {
      let timeoutId: number;

      const fetchFile = async () => {
        try {
          const response = await this.dataloader.load({ id, collection });

          if (!response) {
            return;
          }

          const fileState = mapMediaItemToFileState(id, response);
          observer.next(fileState);

          if (fileState && fileState.status === 'processing') {
            timeoutId = window.setTimeout(fetchFile, POLLING_INTERVAL);
          } else {
            observer.complete();
          }
        } catch (e) {
          observer.error(e);
        }
      };

      fetchFile();

      return () => {
        window.clearTimeout(timeoutId);
      };
    });
  };

  public touchFiles(
    descriptors: TouchFileDescriptor[],
    collection?: string,
  ): Promise<TouchedFiles> {
    return this.mediaStore
      .touchFiles({ descriptors }, { collection })
      .then(({ data }) => data);
  }

  private generateUploadableFileUpfrontIds(
    collection?: string,
  ): UploadableFileUpfrontIds {
    const id = uuid();
    const occurrenceKey = uuid();
    const touchFileDescriptor: TouchFileDescriptor = {
      fileId: id,
      occurrenceKey,
      collection,
    };

    const deferredUploadId = this.touchFiles(
      [touchFileDescriptor],
      collection,
    ).then(touchedFiles => touchedFiles.created[0].uploadId);

    return {
      id,
      occurrenceKey,
      deferredUploadId,
    };
  }

  public upload(
    file: UploadableFile,
    controller?: UploadController,
    uploadableFileUpfrontIds?: UploadableFileUpfrontIds,
  ): Observable<FileState> {
    if (typeof file.content === 'string') {
      file.content = convertBase64ToBlob(file.content);
    }

    const {
      content,
      name = '', // name property is not available in base64 image
      collection,
    } = file;

    if (!uploadableFileUpfrontIds) {
      uploadableFileUpfrontIds = this.generateUploadableFileUpfrontIds(
        collection,
      );
    }

    const id = uploadableFileUpfrontIds.id;
    const occurrenceKey = uploadableFileUpfrontIds.occurrenceKey;

    let mimeType = '';
    let size = 0;
    let preview: FilePreview | undefined;
    // TODO [MSW-796]: get file size for base64
    const mediaType = getMediaTypeFromUploadableFile(file);
    const subject = new ReplaySubject<FileState>(1);

    if (content instanceof Blob) {
      size = content.size;
      mimeType = content.type;
      preview = {
        value: content,
      };
    }

    const stateBase = {
      name,
      size,
      mediaType,
      mimeType,
      id,
      occurrenceKey,
      preview,
    };

    const onProgress = (progress: number) => {
      subject.next({
        status: 'uploading',
        ...stateBase,
        progress,
      });
    };

    const onUploadFinish = (error?: any) => {
      if (error) {
        return subject.error(error);
      }

      subject.next({
        status: 'processing',
        ...stateBase,
      });
      subject.complete();
    };

    const { cancel } = uploadFile(
      file,
      this.mediaStore,
      uploadableFileUpfrontIds,
      {
        onUploadFinish,
        onProgress,
      },
    );

    fileStreamsCache.set(id, subject);

    // We should report progress asynchronously, since this is what consumer expects
    // (otherwise in newUploadService file-converting event will be emitted before files-added)
    setTimeout(() => {
      onProgress(0);
    }, 0);

    if (controller) {
      controller.setAbort(cancel);
    }

    return subject;
  }

  public async downloadBinary(
    id: string,
    name: string = 'download',
    collectionName?: string,
  ) {
    const isIE11 =
      !!(window as any).MSInputMethodContext &&
      !!(document as any).documentMode;
    const iframeName = 'media-download-iframe';
    const link = document.createElement('a');
    let iframe = document.getElementById(iframeName) as HTMLIFrameElement;
    if (!iframe) {
      iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.id = iframeName;
      iframe.name = iframeName;
      document.body.appendChild(iframe);
    }
    link.href = await this.mediaStore.getFileBinaryURL(id, collectionName);
    link.download = name;
    link.target = isIE11 ? '_blank' : iframeName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
