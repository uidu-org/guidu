import loadable from '@loadable/component';

export const HelpDialogLoader = loadable(
  () =>
    import(
      /* webpackChunkName:"@uidu-internal-editor-core-helpdialog" */
      './index'
    ),
);
