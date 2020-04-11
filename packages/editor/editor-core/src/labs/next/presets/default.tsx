// #region Imports
import React from 'react';
import basePlugin from '../../../plugins/base';
import blockTypePlugin from '../../../plugins/block-type';
import clearMarksOnChangeToEmptyDocumentPlugin from '../../../plugins/clear-marks-on-change-to-empty-document';
import editorDisabledPlugin from '../../../plugins/editor-disabled';
// import submitEditorPlugin from '../../../plugins/submit-editor';
import fakeTextCursorPlugin from '../../../plugins/fake-text-cursor';
import featureFlagsContextPlugin from '../../../plugins/feature-flags-context';
import floatingToolbarPlugin from '../../../plugins/floating-toolbar';
import gapCursorPlugin from '../../../plugins/gap-cursor';
import hyperlinkPlugin from '../../../plugins/hyperlink';
import pastePlugin from '../../../plugins/paste';
import textFormattingPlugin from '../../../plugins/text-formatting';
import typeAheadPlugin from '../../../plugins/type-ahead';
import unsupportedContentPlugin from '../../../plugins/unsupported-content';
import widthPlugin from '../../../plugins/width';
import { EditorPlugin } from '../../../types/editor-plugin';
// import scrollIntoViewPlugin from '../../../plugins/scroll-into-view';
import { PresetProvider } from '../Editor';
import { Preset } from './preset';
import { EditorPresetProps } from './types';
// #endregion

interface EditorPresetDefaultProps {
  children?: React.ReactNode;
}

export function useDefaultPreset({ featureFlags }: EditorPresetProps) {
  const preset = new Preset<EditorPlugin>();
  // @ts-ignore
  preset.add([pastePlugin, {}]);
  preset.add(basePlugin);
  preset.add(blockTypePlugin);
  preset.add(clearMarksOnChangeToEmptyDocumentPlugin);
  preset.add(hyperlinkPlugin);
  preset.add(textFormattingPlugin);
  preset.add(widthPlugin);
  preset.add(typeAheadPlugin);
  preset.add(unsupportedContentPlugin);
  preset.add(editorDisabledPlugin);
  preset.add(gapCursorPlugin);
  // preset.add(submitEditorPlugin);
  preset.add(fakeTextCursorPlugin);
  // @ts-ignore
  preset.add([featureFlagsContextPlugin, featureFlags || {}]);
  preset.add(floatingToolbarPlugin);
  // preset.add(scrollIntoViewPlugin);
  return [preset];
}

export function EditorPresetDefault(
  props: EditorPresetDefaultProps & EditorPresetProps,
) {
  const [preset] = useDefaultPreset(props);
  const plugins = preset.getEditorPlugins();

  return <PresetProvider value={plugins}>{props.children}</PresetProvider>;
}
