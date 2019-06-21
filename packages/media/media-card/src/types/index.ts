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
  onClick?: () => void;
  style?: any;
};

export type MediaCardState = {
  status: MediaCardStatus;
  file: any;
};
