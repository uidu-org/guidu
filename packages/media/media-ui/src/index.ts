import * as untypedLocales from './i18n/index';

const locales: { [key: string]: any } = untypedLocales;

export * from './BlockCard';
export * from './InlineCard';
export * from './LinkView';
export { Ellipsify, EllipsifyProps } from './ellipsify';
export { toHumanReadableMediaSize } from './humanReadableSize';
export * from './mixins';
export * from './common';
export * from './camera';
export * from './messages';
export { default as languages } from './i18n/languages';
export { locales };
export * from './infiniteScroll';
export * from './imageMetaData';
export * from './util';
export { default as CustomMediaPlayer } from './customMediaPlayer/index';
export * from './customMediaPlayer/timeRange';
export * from './classNames';
export * from './shortcut';
export * from './formatDuration';
export { default as theme } from './theme';
export { default as ModalSpinner } from './modalSpinner';
