import loadable from '@loadable/component';

export const HelpDialogLoader = loadable(() =>
  import(
    /* webpackChunkName:"@atlaskit-internal-editor-core-helpdialog" */
    './index'
  ),
);
