import { defineMessages } from 'react-intl';

export const messages = defineMessages({
  deleteEmojiTitle: {
    id: 'uidu.emoji.delete.title',
    defaultMessage: 'Remove emoji',
    description: 'Title for emoji removal dialog',
  },
  deleteEmojiDescription: {
    id: 'uidu.emoji.delete.description',
    defaultMessage:
      'All existing instances of this emoji will be replaced with {emojiShortName}',
    description: 'Description for emoji removal dialog',
  },
  deleteEmojiLabel: {
    id: 'uidu.emoji.delete.label',
    defaultMessage: 'Remove',
    description: 'Button label to remove emoji',
  },
  addCustomEmojiLabel: {
    id: 'uidu.emoji.add.custom.emoji.label',
    defaultMessage: 'Add your own emoji',
    description: 'Button label to add custom emoji',
  },
  emojiPlaceholder: {
    id: 'uidu.emoji.placeholder',
    defaultMessage: 'Emoji name',
    description: 'Placeholder for emoji',
  },
  emojiNameAriaLabel: {
    id: 'uidu.emoji.name.ariaLabel',
    defaultMessage: 'Enter a name for the new emoji',
    description: 'Explains to enter a name for a new emoji',
  },
  emojiChooseFileTitle: {
    id: 'uidu.emoji.choose.file.title',
    defaultMessage: 'Choose file',
    description: 'Choose custom emoji file',
  },
  emojiChooseFileAriaLabel: {
    id: 'uidu.emoji.choose.file.ariaLabel',
    defaultMessage:
      'Choose a file for the emoji. JPG, PNG or GIF. Max size 1 MB.',
    description:
      'Message indicating the purpose of choosing the file and requirements for the file',
  },
  emojiImageRequirements: {
    id: 'uidu.emoji.image.requirements',
    defaultMessage: 'JPG, PNG or GIF. Max size 1 MB.',
    description: 'Message for emoji image requirements and maximum file size',
  },
  emojiPreviewTitle: {
    id: 'uidu.emoji.preview.title',
    defaultMessage: 'Preview',
    description: 'Emoji preview title',
  },
  emojiPreview: {
    id: 'uidu.emoji.preview',
    defaultMessage: 'Your new emoji {emoji} looks great',
    description: 'Emoji preview',
  },
  addEmojiLabel: {
    id: 'uidu.emoji.add.label',
    defaultMessage: 'Add emoji',
    description: 'verb - Button label to add emoji',
  },
  retryLabel: {
    id: 'uidu.emoji.retry.label',
    defaultMessage: 'Retry',
    description: 'verb - Button label to retry upload',
  },
  cancelLabel: {
    id: 'uidu.emoji.cancel.label',
    defaultMessage: 'Cancel',
    description: 'verb - button label to cancel operation',
  },
  searchLabel: {
    id: 'uidu.emoji.search.label',
    defaultMessage: 'Search',
    description: 'verb - button label to search',
  },
  categoriesSearchResults: {
    id: 'uidu.emoji.categories.search.results',
    defaultMessage: 'Search results',
    description: 'Emoji categories search results',
  },
  frequentCategory: {
    id: 'uidu.emoji.category.frequent',
    defaultMessage: 'Frequent',
    description: 'Emoji frequent category',
  },
  peopleCategory: {
    id: 'uidu.emoji.category.people',
    defaultMessage: 'People',
    description: 'Emoji frequent category',
  },
  natureCategory: {
    id: 'uidu.emoji.category.nature',
    defaultMessage: 'Nature',
    description: 'Emoji nature category',
  },
  foodsCategory: {
    id: 'uidu.emoji.category.foods',
    defaultMessage: 'Food & Drink',
    description: 'Emoji Foods category',
  },
  activityCategory: {
    id: 'uidu.emoji.category.activity',
    defaultMessage: 'Activity',
    description: 'Emoji activity category',
  },
  placesCategory: {
    id: 'uidu.emoji.category.places',
    defaultMessage: 'Travel & Places',
    description: 'Emoji Places category',
  },
  objectsCategory: {
    id: 'uidu.emoji.category.objects',
    defaultMessage: 'Objects',
    description: 'Emoji objects category',
  },
  symbolsCategory: {
    id: 'uidu.emoji.category.symbols',
    defaultMessage: 'Symbols',
    description: 'Emoji symbols category',
  },
  flagsCategory: {
    id: 'uidu.emoji.category.flags',
    defaultMessage: 'Flags',
    description: 'Emoji flags category',
  },
  productivityCategory: {
    id: 'uidu.emoji.category.productivity',
    defaultMessage: 'Productivity',
    description: 'Emoji productivity category',
  },
  userUploadsCustomCategory: {
    id: 'uidu.emoji.category.user.uploads',
    defaultMessage: 'Your uploads',
    description: 'User uploads in the custom category',
  },
  allUploadsCustomCategory: {
    id: 'uidu.emoji.category.all.uploads',
    defaultMessage: 'All uploads',
    description: 'All uploads in the custom category',
  },

  deleteEmojiFailed: {
    id: 'uidu.emoji.error.delete.failed',
    defaultMessage: 'Remove failed',
    description: 'Error message when custom emoji failed to be removed',
  },
  emojiInvalidImage: {
    id: 'uidu.emoji.error.invalid.image',
    defaultMessage: 'Selected image is invalid',
    description: 'Error message for invalid selected image',
  },
  emojiUploadFailed: {
    id: 'uidu.emoji.error.upload.failed',
    defaultMessage: 'Upload failed',
    description: 'Failed to upload emoji image',
  },
  emojiImageTooBig: {
    id: 'uidu.emoji.error.image.too.big',
    defaultMessage: 'Selected image is more than 1 MB',
    description: 'Error message for image too big, beyond the size limit',
  },
});
