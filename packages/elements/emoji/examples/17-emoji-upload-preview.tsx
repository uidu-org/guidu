import * as React from 'react';
import { onUploadCancelled, onUploadEmoji } from '../examples-utils';
import EmojiUploadPicker from '../src/components/common/EmojiUploadPicker';
import { emojiPickerWidth } from '../src/util/constants';

const defaultStyles = {
  width: emojiPickerWidth,
  border: '1px solid #ccc',
  margin: '20px',
};

export default function Example() {
  return (
    <div style={defaultStyles}>
      <EmojiUploadPicker
        onUploadEmoji={onUploadEmoji}
        onUploadCancelled={onUploadCancelled}
      />
    </div>
  );
}
