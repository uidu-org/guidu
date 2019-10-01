/**
 * Tells TypeScript to ignore flow components by declaring them as empty modules
 */
declare module '@uidu/dropdown-menu';
declare module '@uidu/droplist';
// TODO - Add icon import paths to entry-points.tsconfig.json
declare module '@uidu/icon/*';
declare module '@uidu/item';
declare module '@uidu/layer-manager';
declare module '@uidu/layer';
declare module '@uidu/size-detector';
declare module '@uidu/slider';
declare module '@uidu/spinner';
declare module '@uidu/toggle';
declare module '@uidu/tooltip';

// Build
declare module '@uidu/ssr';
declare module '@uidu/docs';
declare module '@uidu/build-utils';
declare module '@uidu/build-utils/*';
declare module '@uidu/visual-regression';
declare module '@uidu/visual-regression/*';
declare module '@uidu/webdriver-runner';
declare module '@uidu/webdriver-runner/*';
declare module '@uidu/util-common-test';

declare const ENABLE_ANALYTICS_GASV3: string;
declare const WEBSITE_ENV: string;
declare const DEFAULT_META_DESCRIPTION: string;
declare const BASE_TITLE: string;
