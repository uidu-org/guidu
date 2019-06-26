export type FileKinds = 'image' | 'video' | 'link' | 'file';

export type FileIdentifier = {
  src: string | undefined;
  kind: FileKinds;
  description?: string;
  createdAt: string;
  id: number | string;
  filename: string;
  extension: string;
};
