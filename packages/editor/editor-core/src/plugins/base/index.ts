import { doc, paragraph, text } from '@uidu/adf-schema';
import { baseKeymap } from 'prosemirror-commands';
import { history } from 'prosemirror-history';
import { EditorView } from 'prosemirror-view';
import { EditorPlugin, PMPluginFactory } from '../../types';
import { keymap } from '../../utils/keymap';
import decorationPlugin from './pm-plugins/decoration';
import filterStepsPlugin from './pm-plugins/filter-steps';
import focusHandlerPlugin from './pm-plugins/focus-handler';
import frozenEditor from './pm-plugins/frozen-editor';
import inlineCursorTargetPlugin from './pm-plugins/inline-cursor-target';
import newlinePreserveMarksPlugin from './pm-plugins/newline-preserve-marks';
import { plugin as reactNodeView } from './pm-plugins/react-nodeview';
import scrollGutter from './pm-plugins/scroll-gutter';

interface BasePluginOptions {
  allowScrollGutter?: ((view: EditorView) => HTMLElement | null) | undefined;
  allowInlineCursorTarget?: boolean;
  addRunTimePerformanceCheck?: boolean;
}

const basePlugin = (options?: BasePluginOptions): EditorPlugin => ({
  name: 'base',

  pmPlugins() {
    const plugins: { name: string; plugin: PMPluginFactory }[] = [
      {
        name: 'filterStepsPlugin',
        plugin: () => filterStepsPlugin(),
      },
      {
        name: 'inlineCursorTargetPlugin',
        plugin: () =>
          options && options.allowInlineCursorTarget
            ? inlineCursorTargetPlugin()
            : undefined,
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
      {
        name: 'frozenEditor',
        plugin: ({ dispatchAnalyticsEvent }) =>
          options && options.addRunTimePerformanceCheck
            ? frozenEditor(dispatchAnalyticsEvent)
            : undefined,
      },
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

    if (options && options.allowScrollGutter) {
      plugins.push({
        name: 'scrollGutterPlugin',
        plugin: () => scrollGutter(options.allowScrollGutter),
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
