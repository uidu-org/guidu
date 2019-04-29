import { LocalUpload } from '../domain';

export const uploadHasProxy = function(upload: LocalUpload): boolean {
  return Array.isArray(upload.proxy);
};
