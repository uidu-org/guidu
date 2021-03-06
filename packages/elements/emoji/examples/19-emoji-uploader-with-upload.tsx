import * as React from 'react';
import { getEmojiResource, loggedUser, lorem } from '../examples-utils';
import EmojiUploader from '../src/components/uploader/EmojiUploader';
import { EmojiProvider } from '../src/resource';

export interface EmojiProps {}

export default class EmojiUploaderWithUpload extends React.Component<
  EmojiProps,
  {}
> {
  constructor(props: EmojiProps) {
    super(props);
  }

  render() {
    const emojiProvider: Promise<EmojiProvider> = getEmojiResource({
      uploadSupported: true,
      currentUser: { id: loggedUser },
    });
    return (
      <div style={{ padding: '10px' }}>
        <EmojiUploader emojiProvider={emojiProvider} />
        <p style={{ width: '400px' }}>
          {lorem}
          {lorem}
        </p>
      </div>
    );
  }
}
