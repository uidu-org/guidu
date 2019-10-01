import { MentionProvider } from '@uidu/mentions';
import * as React from 'react';
import {
  basePlugin,
  blockTypePlugin,
  clearMarksOnChangeToEmptyDocumentPlugin,
  datePlugin,
  editorDisabledPlugin,
  // breakoutPlugin,
  // jiraIssuePlugin,
  extensionPlugin,
  floatingToolbarPlugin,
  gapCursorPlugin,
  hyperlinkPlugin,
  indentationPlugin,
  // mentionsPlugin,
  // tasksAndDecisionsPlugin,
  insertBlockPlugin,
  layoutPlugin,
  // codeBlockPlugin,
  // panelPlugin,
  listsPlugin,
  mediaPlugin,
  pastePlugin,
  placeholderPlugin,
  // unsupportedContentPlugin,
  quickInsertPlugin,
  rulePlugin,
  // cardPlugin,
  statusPlugin,
  tablesPlugin,
  textColorPlugin,
  textFormattingPlugin,
  typeAheadPlugin,
  widthPlugin,
} from '../../../plugins';
import { MediaProvider } from '../../../plugins/media';
import { PresetProvider } from '../Editor';
import { EditorPresetProps } from './types';
import {
  enableExperimental,
  ExperimentalPluginMap,
  removeExcludes,
} from './utils';

interface EditorPresetCXHTMLProps {
  children?: React.ReactNode;
  placeholder?: string;
  mentionProvider?: Promise<MentionProvider>;
  mediaProvider?: Promise<MediaProvider>;
}

export function EditorPresetCXHTML({
  children,
  mentionProvider,
  mediaProvider,
  placeholder,
  excludes,
  experimental,
}: EditorPresetCXHTMLProps & EditorPresetProps) {
  let plugins = [
    pastePlugin(),
    blockTypePlugin(),
    clearMarksOnChangeToEmptyDocumentPlugin(),
    hyperlinkPlugin(),
    textFormattingPlugin({}),
    widthPlugin(),
    quickInsertPlugin(),
    tablesPlugin({
      tableOptions: { advanced: true },
    }),
    // codeBlockPlugin(),
    // panelPlugin(),
    listsPlugin(),
    textColorPlugin(),
    // breakoutPlugin(),
    // jiraIssuePlugin(),
    extensionPlugin(),
    rulePlugin(),
    datePlugin(),
    layoutPlugin(),
    indentationPlugin(),
    // cardPlugin(),
    statusPlugin({ menuDisabled: false }),
    // tasksAndDecisionsPlugin(),
    insertBlockPlugin({}),
    placeholderPlugin({ placeholder }),
    editorDisabledPlugin(),
    typeAheadPlugin(),
    floatingToolbarPlugin(),
    gapCursorPlugin(),
  ];

  // if (mentionProvider) {
  //   plugins.push(mentionsPlugin());
  // }

  if (mediaProvider) {
    plugins.push(
      mediaPlugin({
        provider: mediaProvider,
        allowMediaSingle: true,
        allowMediaGroup: true,
        allowAnnotation: true,
        allowResizing: true,
      }),
    );
  }

  const experimentalMap: ExperimentalPluginMap = new Map();
  plugins = removeExcludes(plugins, excludes);
  plugins = enableExperimental(plugins, experimental, experimentalMap);

  // Add plugins that cannot be excluded for this preset.
  plugins.push(
    // unsupportedContentPlugin(),
    basePlugin({
      allowInlineCursorTarget: true,
      allowScrollGutter: () =>
        document.querySelector('.fabric-editor-popup-scroll-parent'),
    }),
  );

  return <PresetProvider value={plugins}>{children}</PresetProvider>;
}
