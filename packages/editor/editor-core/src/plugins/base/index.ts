import { doc, paragraph, text } from '@atlaskit/adf-schema';
import { baseKeymap } from 'prosemirror-commands';
import { history } from 'prosemirror-history';
import { EditorAppearance, EditorPlugin, PMPluginFactory } from '../../types';
import { isFullPage } from '../../utils/is-full-page';
import { keymap } from '../../utils/keymap';
import decorationPlugin from './pm-plugins/decoration';
import filterStepsPlugin from './pm-plugins/filter-steps';
import focusHandlerPlugin from './pm-plugins/focus-handler';
import inlineCursorTargetPlugin from './pm-plugins/inline-cursor-target';
import newlinePreserveMarksPlugin from './pm-plugins/newline-preserve-marks';
import { plugin as reactNodeView } from './pm-plugins/react-nodeview';
import scrollGutter from './pm-plugins/scroll-gutter';

const basePlugin = (appearance?: EditorAppearance): EditorPlugin => ({
  pmPlugins() {
    const plugins: { name: string; plugin: PMPluginFactory }[] = [
      {
        name: 'filterStepsPlugin',
        plugin: () => filterStepsPlugin(),
      },
      {
        name: 'inlineCursorTargetPlugin',
        plugin: () =>
          appearance !== 'mobile' ? inlineCursorTargetPlugin() : undefined,
      },
      {
        name: 'focusHandlerPlugin',
        plugin: ({ dispatch }) => focusHandlerPlugin(dispatch),
      },
      {
        name: 'newlinePreserveMarksPlugin',
        plugin: newlinePreserveMarksPlugin,
      },
      { name: 'reactNodeView', plugin: () => reactNodeView },
      { name: 'decorationPlugin', plugin: () => decorationPlugin() },
      { name: 'history', plugin: () => history() },
      // should be last :(
      {
        name: 'codeBlockIndent',
        plugin: () =>
          keymap({
            ...baseKeymap,
            'Mod-[': () => true,
            'Mod-]': () => true,
          }),
      },
    ];

    if (isFullPage(appearance)) {
      plugins.push({
        name: 'scrollGutterPlugin',
        plugin: () => scrollGutter(),
      });
    }

    return plugins;
  },
  nodes() {
    return [
      { name: 'doc', node: doc },
      { name: 'paragraph', node: paragraph },
      { name: 'text', node: text },
    ];
  },
});

export default basePlugin;
