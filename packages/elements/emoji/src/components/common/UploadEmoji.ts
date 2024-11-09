import { MessageDescriptor } from 'react-intl';
import { EmojiProvider, supportsUploadFeature } from '../../api/EmojiResource';
import { EmojiDescription, EmojiUpload } from '../../types';
import { messages } from '../i18n';

export const uploadEmoji = (
  upload: EmojiUpload,
  emojiProvider: EmojiProvider,
  errorSetter: (message: MessageDescriptor | undefined) => void,
  onSuccess: (emojiDescription: EmojiDescription) => void,
) => {
  errorSetter(undefined);
  if (supportsUploadFeature(emojiProvider)) {
    emojiProvider
      .uploadCustomEmoji(upload)
      .then((emojiDescription) => {
        onSuccess(emojiDescription);
      })
      .catch((err) => {
        errorSetter(messages.emojiUploadFailed);
        // eslint-disable-next-line no-console
        console.error('Unable to upload emoji', err);
      });
  }
};
