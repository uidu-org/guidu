import classNames from 'classnames';
import * as React from 'react';
import { getEmojis } from '../examples-utils';
import EmojiPickerList from '../src/components/picker/EmojiPickerList';
import * as styles from '../src/components/picker/styles';

export default function Example() {
  return (
    <div className={classNames([styles.emojiPicker])}>
      <EmojiPickerList emojis={getEmojis()} />
    </div>
  );
}
