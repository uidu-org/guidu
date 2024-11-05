import { EmojiId } from '@uidu/emoji';
import { safeInsert } from '@uidu/prosemirror-utils';
import { Fragment } from 'prosemirror-model';
import { Selection } from 'prosemirror-state';
import { Command } from '../../../types';

export function insertEmoji(emojiId: EmojiId): Command {
  return (state, dispatch) => {
    const { emoji } = state.schema.nodes;

    if (emoji && emojiId) {
      const node = emoji.createChecked({
        ...emojiId,
        text: emojiId.fallback || emojiId.shortName,
      });

      const textNode = state.schema.text(' ');

      if (dispatch) {
        const fragment = Fragment.fromArray([node, textNode]);
        const tr = safeInsert(fragment)(state.tr);

        dispatch(
          tr.setSelection(
            Selection.near(
              tr.doc.resolve(state.selection.$from.pos + fragment.size),
            ),
          ),
        );
      }
      return true;
    }
    return false;
  };
}
