// Common Translations will live here
import { linkMessages } from '@uidu/editor-common';
import { defineMessages } from 'react-intl';

export { linkMessages };

export const linkToolbarMessages = defineMessages({
  addLink: {
    id: 'uidu.editor-core.mediaAddLink',
    defaultMessage: 'Add link',
    description: 'Add link',
  },
  unableToOpenLink: {
    id: 'uidu.editor-core.unableToOpenLink',
    defaultMessage: 'Unable to open this link',
    description: 'Unable to open this link',
  },
  unlink: {
    id: 'uidu.editor-core.unlink',
    defaultMessage: 'Unlink',
    description: 'Removes the hyperlink but keeps your text.',
  },
  editLink: {
    id: 'uidu.editor-core.editLink',
    defaultMessage: 'Edit link',
    description: 'Edit the link, update display text',
  },
  placeholder: {
    id: 'uidu.editor-core.hyperlinkToolbarPlaceholder',
    defaultMessage: 'Paste link or search recently viewed',
    description: 'Paste link or search recently viewed',
  },
  linkPlaceholder: {
    id: 'uidu.editor-core.linkPlaceholder',
    defaultMessage: 'Paste link',
    description: 'Create a new link by pasting a URL.',
  },
  linkAddress: {
    id: 'uidu.editor-core.linkAddress',
    defaultMessage: 'Link address',
    description: 'Insert the address of the link',
  },
  invalidLink: {
    defaultMessage: 'Please enter a valid link.',
    description: 'Please enter a valid link.',
  },
  emptyLink: {
    defaultMessage: 'Please enter a link.',
    description: 'Please enter a link.',
  },
});

export default defineMessages({
  layoutFixedWidth: {
    id: 'uidu.editor-core.layoutFixedWidth',
    defaultMessage: 'Back to center',
    description:
      'Display your element (image, table, extension, etc) as standard width',
  },
  layoutWide: {
    id: 'uidu.editor-core.layoutWide',
    defaultMessage: 'Go wide',
    description:
      'Display your element (image, table, extension, etc) wider than normal',
  },
  layoutFullWidth: {
    id: 'uidu.editor-core.layoutFullWidth',
    defaultMessage: 'Go full width',
    description:
      'Display your element (image, table, extension, etc) as full width',
  },
  alignImageRight: {
    id: 'uidu.editor-core.alignImageRight',
    defaultMessage: 'Align right',
    description: 'Aligns image to the right',
  },
  alignImageCenter: {
    id: 'uidu.editor-core.alignImageCenter',
    defaultMessage: 'Align center',
    description: 'Aligns image to the center',
  },
  alignImageLeft: {
    id: 'uidu.editor-core.alignImageLeft',
    defaultMessage: 'Align left',
    description: 'Aligns image to the left',
  },
  remove: {
    id: 'uidu.editor-core.remove',
    defaultMessage: 'Remove',
    description:
      'Delete the element (image, panel, table, etc.) from your document',
  },
  visit: {
    id: 'uidu.editor-core.visit',
    defaultMessage: 'Open link in a new window',
    description: 'Open the link in a new window',
  },
  inviteToEditButtonTitle: {
    id: 'uidu.editor-core.editMode.inviteToEditButton.title',
    defaultMessage: 'Invite to edit',
    description: 'Invite another user to edit the current document',
  },
  saveButton: {
    id: 'uidu.editor-core.saveButton',
    defaultMessage: 'Save',
    description: 'Submit and save a comment or document',
  },
  cancelButton: {
    id: 'uidu.editor-core.cancelButton',
    defaultMessage: 'Cancel',
    description: 'Discard the current comment or document',
  },
});
