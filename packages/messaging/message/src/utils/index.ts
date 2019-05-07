const emojiRegex = require('emoji-regex');

export const isOnlyEmojis = (message: string) => {
  if (!message) return true;

  const noEmojis = message.replace(emojiRegex(), '');
  const noSpace = noEmojis.replace(/[\s\n]/gm, '');

  return !noSpace;
};
