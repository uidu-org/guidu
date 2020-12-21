import Layer from '@uidu/layer';
import * as React from 'react';
import { getUsageClearEmojiResource } from '../examples-utils';
import {
  UsageShowAndClearComponent,
  UsagingShowingProps,
} from '../examples-utils/demo-emoji-usage-components';
import { EmojiPicker } from '../src/picker';
import { EmojiProvider } from '../src/resource';

class UsageShowingEmojiPickerTextInput extends UsageShowAndClearComponent {
  constructor(props: UsagingShowingProps) {
    super(props);
  }

  getWrappedComponent() {
    const { emojiResource } = this.props;
    return (
      <Layer
        content={
          <EmojiPicker
            onSelection={this.onSelection}
            emojiProvider={Promise.resolve(emojiResource as EmojiProvider)}
          />
        }
        position="bottom left"
      >
        <input
          id="picker-input"
          style={{
            height: '20px',
            marginBottom: '320px',
          }}
        />
      </Layer>
    );
  }
}

export default function Example() {
  return (
    <UsageShowingEmojiPickerTextInput
      emojiResource={getUsageClearEmojiResource()}
    />
  );
}
