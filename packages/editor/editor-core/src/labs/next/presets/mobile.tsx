import { EmojiProvider } from '@uidu/emoji';
import { MentionProvider } from '@uidu/mentions';
import * as React from 'react';
import {
  annotationPlugin,
  basePlugin,
  blockTypePlugin,
  // cardPlugin,
  clearMarksOnChangeToEmptyDocumentPlugin,
  // codeBlockPlugin,
  datePlugin,
  editorDisabledPlugin,
  // emojiPlugin,
  extensionPlugin,
  floatingToolbarPlugin,
  gapCursorPlugin,
  hyperlinkPlugin,
  insertBlockPlugin,
  layoutPlugin,
  listsPlugin,
  mediaPlugin,
  // mentionsPlugin,
  // panelPlugin,
  pastePlugin,
  placeholderPlugin,
  rulePlugin,
  statusPlugin,
  tablesPlugin,
  // tasksAndDecisionsPlugin,
  textColorPlugin,
  textFormattingPlugin,
  typeAheadPlugin,
  // unsupportedContentPlugin,
  widthPlugin,
} from '../../../plugins';
import { CustomMediaPicker, MediaProvider } from '../../../plugins/media';
import { PresetProvider } from '../Editor';
import { EditorPresetProps } from './types';
import {
  enableExperimental,
  ExperimentalPluginMap,
  removeExcludes,
} from './utils';

interface EditorPresetMobileProps {
  children?: React.ReactNode;
  placeholder?: string;
  mentionProvider?: Promise<MentionProvider>;
  emojiProvider?: Promise<EmojiProvider>;
  media?: {
    provider?: Promise<MediaProvider>;
    picker?: CustomMediaPicker;
  };
}

export function EditorPresetMobile({
  children,
  mentionProvider,
  emojiProvider,
  media,
  placeholder,
  excludes,
  experimental,
}: EditorPresetMobileProps & EditorPresetProps) {
  let plugins = [
    pastePlugin(),
    blockTypePlugin(),
    clearMarksOnChangeToEmptyDocumentPlugin(),
    hyperlinkPlugin(),
    textFormattingPlugin({}),
    widthPlugin(),
    tablesPlugin({
      tableOptions: { allowControls: false },
    }),
    // codeBlockPlugin(),
    // panelPlugin(),
    listsPlugin(),
    textColorPlugin(),
    extensionPlugin(),
    rulePlugin(),
    datePlugin(),
    layoutPlugin(),
    statusPlugin({ menuDisabled: false, useInlineWrapper: true }),
    // tasksAndDecisionsPlugin(),
    insertBlockPlugin({}),
    placeholderPlugin({ placeholder }),
    editorDisabledPlugin(),
    typeAheadPlugin(),
    floatingToolbarPlugin(),
    gapCursorPlugin(),
    annotationPlugin(),
    // cardPlugin(),
  ];

  // if (mentionProvider) {
  //   plugins.push(
  //     mentionsPlugin({
  //       useInlineWrapper: true,
  //     }),
  //   );
  // }

  // if (emojiProvider) {
  //   plugins.push(
  //     emojiPlugin({
  //       useInlineWrapper: true,
  //     }),
  //   );
  // }

  if (media) {
    plugins.push(
      mediaPlugin({
        provider: media.provider,
        customMediaPicker: media.picker,
        allowMediaSingle: true,
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
      allowScrollGutter: () => document.body,
    }),
  );

  return <PresetProvider value={plugins}>{children}</PresetProvider>;
}
