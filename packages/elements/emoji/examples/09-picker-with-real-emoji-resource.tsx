import Layer from '@uidu/layer';
import * as React from 'react';
import { onSelection } from '../examples-utils';
import ResourcedEmojiControl, {
  getEmojiConfig,
  getRealEmojiResource,
} from '../examples-utils/demo-resource-control';
import { EmojiPicker } from '../src/picker';
import { emojiPickerHeight } from '../src/util/constants';

const getPicker = () => (
  <div style={{ padding: '10px' }}>
    <Layer
      content={
        <EmojiPicker
          emojiProvider={getRealEmojiResource()}
          onSelection={onSelection}
        />
      }
      position="bottom left"
    >
      <input
        id="picker-input"
        style={{
          height: '20px',
          margin: '10px',
        }}
      />
    </Layer>
  </div>
);

export default function Example() {
  return (
    <ResourcedEmojiControl
      emojiConfig={getEmojiConfig()}
      customEmojiProvider={getRealEmojiResource()}
      children={getPicker()}
      customPadding={emojiPickerHeight}
    />
  );
}
