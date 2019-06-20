import { keymap } from 'prosemirror-keymap';
import { Plugin } from 'prosemirror-state';
import * as keymaps from '../../../keymaps';
import { EmojiState, emojiPluginKey } from './main';

export function keymapPlugin(): Plugin {
  const list = {};

  keymaps.bindKeymapWithCommand(
    keymaps.moveUp.common!,
    (state, _dispatch) => {
      const emojisPlugin = emojiPluginKey.getState(state) as EmojiState;
      if (!emojisPlugin.queryActive) {
        return false;
      }

      return emojisPlugin.onSelectPrevious();
    },
    list,
  );

  keymaps.bindKeymapWithCommand(
    keymaps.moveDown.common!,
    (state, _dispatch) => {
      const emojisPlugin = emojiPluginKey.getState(state) as EmojiState;
      if (!emojisPlugin.queryActive) {
        return false;
      }

      return emojisPlugin.onSelectNext();
    },
    list,
  );

  keymaps.bindKeymapWithCommand(
    keymaps.enter.common!,
    (state, _dispatch) => {
      const emojisPlugin = emojiPluginKey.getState(state) as EmojiState;
      if (!emojisPlugin.queryActive) {
        return false;
      }

      return emojisPlugin.onSelectCurrent(keymaps.enter.common);
    },
    list,
  );

  keymaps.bindKeymapWithCommand(
    keymaps.insertNewLine.common!,
    (state, _dispatch) => {
      const emojisPlugin = emojiPluginKey.getState(state) as EmojiState;
      if (!emojisPlugin.queryActive) {
        return false;
      }

      emojisPlugin.onSelectCurrent(keymaps.insertNewLine.common);
      return false;
    },
    list,
  );

  keymaps.bindKeymapWithCommand(
    keymaps.tab.common!,
    (state, _dispatch) => {
      const emojisPlugin = emojiPluginKey.getState(state) as EmojiState;
      if (!emojisPlugin.queryActive) {
        return false;
      }

      return emojisPlugin.onSelectCurrent(keymaps.tab.common);
    },
    list,
  );

  keymaps.bindKeymapWithCommand(
    keymaps.escape.common!,
    (state, _dispatch) => {
      const emojisPlugin = emojiPluginKey.getState(state) as EmojiState;
      if (!emojisPlugin.queryActive) {
        return false;
      }

      /**
       * Jira uses escape to toggle the collapsed editor
       * stop the event propagation when the picker is open
       */
      if (window.event) {
        window.event.stopPropagation();
      }

      return emojisPlugin.dismiss();
    },
    list,
  );

  keymaps.bindKeymapWithCommand(
    keymaps.space.common!,
    (state, _dispatch) => {
      const emojisPlugin = emojiPluginKey.getState(state) as EmojiState;
      if (!emojisPlugin.queryActive) {
        return false;
      }

      return emojisPlugin.trySelectCurrentWithSpace(keymaps.space.common);
    },
    list,
  );

  return keymap(list);
}

export default keymapPlugin;
