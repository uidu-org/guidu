export type MediaFile = {
  readonly id: string;
  readonly upfrontId: Promise<string>;
  readonly userUpfrontId?: Promise<string>;
  readonly userOccurrenceKey?: Promise<string>;
  readonly name: string;
  readonly size: number;
  readonly creationDate: number;
  readonly type: string;
  readonly occurrenceKey?: string;
};

export function copyMediaFileForUpload(
  {
    name,
    size,
    creationDate,
    type,
    upfrontId,
    userUpfrontId,
    occurrenceKey,
    userOccurrenceKey,
  }: MediaFile,
  fileId: string,
): MediaFile {
  // We dont' use spread here because user upload events are not sanitized
  return {
    id: fileId,
    name,
    size,
    creationDate,
    type,
    upfrontId,
    userUpfrontId,
    occurrenceKey,
    userOccurrenceKey,
  };
}
