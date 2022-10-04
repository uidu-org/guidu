import { EditorPlugin, EditorProps } from '../../types';
import contextPanelPlugin from '../context-panel';
import floatingToolbarPlugin from '../floating-toolbar';
import gridPlugin from '../grid';
import hyperlinkPlugin from '../hyperlink';
import placeholderPlugin from '../placeholder';
import textFormattingPlugin from '../text-formatting';

export default function starteKitPlugin({
  placeholder,
  textFormatting,
  isFullPage,
}: EditorProps): EditorPlugin[] {
  return [
    placeholderPlugin({
      placeholder,
      // placeholderHints,
      // placeholderBracketHint,
    }),
    hyperlinkPlugin(),
    textFormattingPlugin(textFormatting || {}),
    gridPlugin({ shouldCalcBreakoutGridLines: isFullPage }),
    // submitEditorPlugin(),
    floatingToolbarPlugin(),
    contextPanelPlugin(),
  ];
}
