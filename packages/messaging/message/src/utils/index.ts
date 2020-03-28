import { FileIdentifier } from '@uidu/media-core/types';

const emojiRegex = require('emoji-regex');

export const isOnlyEmojis = (message: string) => {
  if (!message) return true;

  const noEmojis = message.replace(emojiRegex(), '');
  const noSpace = noEmojis.replace(/[\s\n]/gm, '');

  return !noSpace;
};

export const isOnlyImages = (attachments: FileIdentifier[]) => {
  return attachments.every((attachment) => attachment.kind === 'image');
};
