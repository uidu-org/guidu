import loadable from '@loadable/component';

export const ToolbarLoader = loadable(() =>
  import(
    /* webpackChunkName:"@atlaskit-internal-editor-core-floating-toolbar" */
    './Toolbar'
  ),
);
