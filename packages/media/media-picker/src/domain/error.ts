export type MediaErrorName =
  | 'object_create_fail'
  | 'metadata_fetch_fail'
  | 'token_fetch_fail'
  | 'token_update_fail'
  | 'token_source_empty'
  | 'upload_fail'
  | 'user_token_fetch_fail'
  | 'remote_upload_fail';

export type MediaError = {
  readonly fileId?: string;
  readonly name: MediaErrorName;
  readonly description: string;
};
