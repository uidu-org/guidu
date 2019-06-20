export type InsertedImageProperties = {
  src?: string;
  alt?: string;
  title?: string;
};

export type ImageUploadHandler = (
  e: Event | undefined,
  insertImageFn: (props: InsertedImageProperties) => void,
) => void;

export type ImageUploadPluginAction = {
  name: 'START_UPLOAD';
  event?: Event;
};

export type ImageUploadPluginState = {
  active: boolean;
  enabled: boolean;
  hidden: boolean;
  activeUpload?: {
    event?: Event;
  };
};
