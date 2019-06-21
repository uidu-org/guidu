export type MediaCardStatus =
  | 'uploading'
  | 'loading'
  | 'processing'
  | 'complete'
  | 'error'
  | 'failed-processing';

export type MediaCardProps = {
  identifier?: string | number;
  file?: any;
};

export type MediaCardState = {
  status: MediaCardStatus;
  file: any;
};
