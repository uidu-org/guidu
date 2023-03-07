export type LinkPreviewProps = {
  apiKey: string;
  className?: string;
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
  data?: LinkPayloadProps;
};

export type LinkCardState = {
  url: string;
  title: string;
  description: string;
  imageUrl: string;
  videoUrl: string;
  isVideo: boolean;
  logo: string;
  // color: string;
  // backgroundColor: string;
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
  title: string;
  description: string;
  logo: string;
  imageUrl: string;
  videoUrl: string;
  isVideo: boolean;
  isLoading: boolean;
  size: string;
  autoPlay: boolean;
  controls: boolean;
  loop: boolean;
  muted: boolean;
  playsInline: boolean;
};
