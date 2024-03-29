import { EmojiDescription, EmojiUpload } from '@uidu/emoji';

export interface PromiseBuilder<R> {
  (result: R, context: string): Promise<R>;
}

export interface UploadDetail {
  upload: EmojiUpload;
  emoji: EmojiDescription;
}

// Copy of constants from @uidu/emoji
// NOTE: if this is changed in the original package, this must also be modified
export const customType = 'SITE';
export const customCategory = 'CUSTOM';
export const selectedToneStorageKey = 'uidu.emoji.selectedTone';
