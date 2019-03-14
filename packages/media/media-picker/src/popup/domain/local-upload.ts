import { UploadEvent } from '../../domain/uploadEvent';

export interface LocalUploadFileMetadata {
  readonly id: string;
  readonly mimeType: string;
  readonly name: string;
  readonly size: number;
  readonly upfrontId: Promise<string>;
  readonly userUpfrontId: Promise<string>;
  readonly userOccurrenceKey: Promise<string>;
  readonly occurrenceKey?: string;
}

export interface LocalUploadFile {
  readonly metadata: LocalUploadFileMetadata;

  blob?: Blob;
}

export interface LocalUpload {
  readonly file: LocalUploadFile;
  readonly events: UploadEvent[];
  readonly index: number;
  readonly timeStarted: number;

  progress: number | null;
  proxy?: string[];
}

export type LocalUploads = { [uploadId: string]: LocalUpload };

export function hasLocalUploadStartedProcessing(
  localUpload: LocalUpload,
): boolean {
  return localUpload.events.some(event => event.name === 'upload-processing');
}
