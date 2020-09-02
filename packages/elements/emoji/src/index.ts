import { AbstractResource } from '@atlaskit/util-service-support';
import EmojiLoader from './api/EmojiLoader';
import EmojiRepository from './api/EmojiRepository';
import type {
  EmojiProvider,
  EmojiResourceConfig,
  UploadingEmojiProvider,
} from './api/EmojiResource';
import EmojiResource from './api/EmojiResource';
import { denormaliseEmojiServiceResponse } from './api/EmojiUtils';
import { UsageFrequencyTracker } from './api/internal/UsageFrequencyTracker';
import Emoji from './components/common/Emoji';
import EmojiPlaceholder from './components/common/EmojiPlaceholder';
import ResourcedEmoji from './components/common/ResourcedEmoji';
import EmojiPicker from './components/picker/EmojiPicker';
import EmojiTypeAhead from './components/typeahead/EmojiTypeAhead';
import EmojiTypeAheadItem from './components/typeahead/EmojiTypeAheadItem';
import EmojiUploader from './components/uploader/EmojiUploader';
import {
  customCategory,
  defaultEmojiHeight,
  emojiPickerHeight,
  emojiPickerWidth,
} from './util/constants';
import { toEmojiId, toOptionalEmojiId } from './util/type-helpers';

export * from './types';
export type {
  // interfaces
  EmojiProvider,
  UploadingEmojiProvider,
  EmojiResourceConfig,
};
export {
  AbstractResource,
  Emoji,
  EmojiPlaceholder,
  EmojiLoader,
  EmojiPicker,
  EmojiUploader,
  EmojiResource,
  EmojiRepository,
  EmojiTypeAhead,
  ResourcedEmoji,
  // functions
  denormaliseEmojiServiceResponse,
  toEmojiId,
  toOptionalEmojiId,
  // Constants
  emojiPickerWidth,
  emojiPickerHeight,
  defaultEmojiHeight,
  customCategory,
  UsageFrequencyTracker,
  EmojiTypeAheadItem,
};

export default EmojiPicker;
