import { EmojiProvider } from '@uidu/emoji';
import { MentionProvider } from '@uidu/mentions';
import { ExtensionProvider } from '../extensions/types';
import { AutoformattingProvider } from './autoformatting-provider';
import { CardProvider } from './card-provider';
import type { CollabEditProvider } from './collab-edit-provider';
import { ImageUploadProvider } from './image-upload-provider';
import { MacroProvider } from './macro-provider';
import { MediaProvider } from './media-provider';
import { QuickInsertProvider } from './quick-insert-provider';
import { TokenProvider } from './token-provider';

export interface Providers {
  mediaProvider?: Promise<MediaProvider>;
  emojiProvider?: Promise<EmojiProvider>;
  mentionProvider?: Promise<MentionProvider>;
  extensionProvider?: Promise<ExtensionProvider>;
  autoformattingProvider?: Promise<AutoformattingProvider>;
  imageUploadProvider?: Promise<ImageUploadProvider>;
  collabEditProvider?: Promise<CollabEditProvider>;
  macroProvider?: Promise<MacroProvider>;
  cardProvider?: Promise<CardProvider>;
  quickInsertProvider?: Promise<QuickInsertProvider>;
  tokenProvider?: Promise<TokenProvider>;

  activityProvider?: Promise<any>; // TODO: Activity AK component looks deprecated any suggestion?
  presenceProvider?: Promise<any>; // TODO: https://product-fabric.atlassian.net/browse/ED-8592
  reactionsStore?: Promise<any>; // TODO: https://product-fabric.atlassian.net/browse/ED-8593
}

export type ProviderName = keyof Providers;
export type ProviderType<T> = T extends keyof Providers
  ? Providers[T]
  : Promise<any>;

export type ProviderHandler<T extends string = any> = (
  name: T,
  provider?: ProviderType<typeof name>,
) => void;
