export type FileProps = {
  src: string | undefined;
  kind: string;
  description?: string;
  createdAt: string;
  id: number | string;
  filename: string;
  blob: any;
  extension: string;
};

export type MediaCardProps = {
  file: FileProps;
  onClick?: () => void;
  style?: any;
};
