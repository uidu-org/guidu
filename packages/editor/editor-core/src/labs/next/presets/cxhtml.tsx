// #region Imports
import { MentionProvider } from '@uidu/mentions';
import React from 'react';
import {
  basePlugin,
  // breakoutPlugin,
  // cardPlugin,
  // codeBlockPlugin,
  datePlugin,
  extensionPlugin,
  indentationPlugin,
  insertBlockPlugin,
  // jiraIssuePlugin,
  layoutPlugin,
  listsPlugin,
  mediaPlugin,
  // mentionsPlugin,
  // panelPlugin,
  placeholderPlugin,
  quickInsertPlugin,
  rulePlugin,
  statusPlugin,
  tablesPlugin,
  // tasksAndDecisionsPlugin,
  textColorPlugin,
} from '../../../plugins';
import { MediaProvider } from '../../../plugins/media';
import { PresetProvider } from '../Editor';
import { useDefaultPreset } from './default';
import { EditorPresetProps } from './types';

// #endregion

export type EditorPresetCXHTMLProps = {
  children?: React.ReactNode;
  placeholder?: string;
  mentionProvider?: Promise<MentionProvider>;
  mediaProvider?: Promise<MediaProvider>;
} & EditorPresetProps;

export function useCXHTMLPreset({
  mentionProvider,
  mediaProvider,
  placeholder,
  featureFlags,
}: EditorPresetCXHTMLProps) {
  const [preset] = useDefaultPreset({
    featureFlags,
  });

  // @ts-ignore
  preset.add([
    basePlugin,
    {
      allowInlineCursorTarget: true,
      allowScrollGutter: {
        getScrollElement: (_view) =>
          document.querySelector('.fabric-editor-popup-scroll-parent') || null,
      },
    },
  ]);
  preset.add(quickInsertPlugin);
  preset.add([tablesPlugin, { tableOptions: { advanced: true } }]);
  // preset.add(codeBlockPlugin);
  // preset.add(panelPlugin);
  preset.add(listsPlugin);
  preset.add(textColorPlugin);
  // preset.add(breakoutPlugin);
  // preset.add(jiraIssuePlugin);
  preset.add(extensionPlugin);
  preset.add(rulePlugin);
  preset.add(datePlugin);
  // @ts-ignore
  preset.add(layoutPlugin);
  preset.add(indentationPlugin);
  // preset.add([cardPlugin, { allowBlockCards: true }]);
  preset.add([statusPlugin, { menuDisabled: false }]);
  // preset.add(tasksAndDecisionsPlugin);
  preset.add(insertBlockPlugin);
  // @ts-ignore
  preset.add([placeholderPlugin, { placeholder }]);

  // if (mentionProvider) {
  //   preset.add(mentionsPlugin);
  // }

  if (mediaProvider) {
    // @ts-ignore
    preset.add([
      mediaPlugin,
      {
        provider: mediaProvider,
        allowMediaSingle: true,
        allowMediaGroup: true,
        allowAnnotation: true,
        allowResizing: true,
        allowLinking: true,
        allowResizingInTables: true,
        allowAltTextOnImages: true,
      },
    ]);
  }

  return [preset];
}

export function EditorPresetCXHTML(props: EditorPresetCXHTMLProps) {
  const { children, excludes } = props;
  const [preset] = useCXHTMLPreset(props);
  const plugins = preset.getEditorPlugins(excludes);

  return <PresetProvider value={plugins}>{children}</PresetProvider>;
}
