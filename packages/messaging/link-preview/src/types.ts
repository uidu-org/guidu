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
  onScraped: (data: LinkPayloadProps) => void;
};

export type LinkPayloadProps = {
  author: string;
  date: string;
  description: string;
  image: string;
  logo: string;
  publisher: string;
  title: string;
  url: string;
  //
  audio: string;
  video: string;
  lang: string;
};

export type LinkCardProps = {
  className?: string;
  url: string;
  color?: string;
  title: string;
  description: string;
  logo: string;
  imageUrl: string;
  videoUrl: string;
  isVideo: boolean;
  backgroundColor: string;
  isLoading: boolean;
  size: string;
  autoPlay: boolean;
  controls: boolean;
  loop: boolean;
  muted: boolean;
  playsInline: boolean;
};
