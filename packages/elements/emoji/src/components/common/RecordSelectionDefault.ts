import * as React from 'react';

import { EmojiId, OnEmojiEvent, OptionalEmojiDescription } from '../../types';
import { EmojiProvider } from '../../api/EmojiResource';

/**
 * A function that will wrap any configured Emoji 'onSelection' function to ensure recordSelection is always
 * called.
 *
 * @param provider the EmojiProvider which will be called on each emoji selection
 * @param onSelect the onSelect function that is explicitly configured on the Emoji component.
 */
export const createRecordSelectionDefault = <T>(
  provider: EmojiProvider,
  onSelect?: OnEmojiEvent<T>,
): OnEmojiEvent<T> => {
  return (
    emojiId: EmojiId,
    emoji: OptionalEmojiDescription,
    event?: React.SyntheticEvent<T>,
  ) => {
    try {
      if (provider.recordSelection && emoji) {
        provider.recordSelection(emoji);
      }
    } finally {
      if (onSelect) {
        onSelect(emojiId, emoji, event);
      }
    }
  };
};
