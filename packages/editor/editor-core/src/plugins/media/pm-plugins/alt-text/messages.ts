import { defineMessages } from 'react-intl';

export const messages = defineMessages({
  altText: {
    id: 'uidu.editor-core.addAltText',
    defaultMessage: 'Alt text',
    description: 'Add an alt text for this image',
  },
  editAltText: {
    id: 'uidu.editor-core.editAltText',
    defaultMessage: 'Edit alt text',
    description: 'Edit an alt text for this image',
  },
  back: {
    id: 'uidu.editor-core.closeAltTextEdit',
    defaultMessage: 'Back',
    description: 'Back to toolbar',
  },
  clear: {
    id: 'uidu.editor-core.clearAltTextEdit',
    defaultMessage: 'Clear alt text',
    description: 'Clear alt text',
  },
  placeholder: {
    id: 'uidu.editor-core.placeholderAltText',
    defaultMessage: 'Describe this image with alt text',
    description: 'Describe this image with alt text',
  },
  supportText: {
    id: 'uidu.editor-core.supportAltText',
    defaultMessage:
      'Alt text is useful for people using screen readers because of visual limitations.',
    description:
      'Alt text is useful for people using screen readers because of visual limitations.',
  },
  validationMessage: {
    id: 'uidu.editor-core.alttext.validation',
    defaultMessage: 'Please remove any special characters in alt text.',
    description: 'Please remove any special characters in alt text. ',
  },
});
