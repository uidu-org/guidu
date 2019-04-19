export type LinkPreviewProps = {
  apiKey: string;
  autoPlay: boolean;
  contrast: string | boolean;
  controls: boolean;
  media: string | Array<string>;
  loop: boolean;
  muted: boolean;
  direction: string;
  playsInline: boolean;
  prerender: 'auto' | true | false;
  size: 'normal' | 'large';
  url: string;
};
