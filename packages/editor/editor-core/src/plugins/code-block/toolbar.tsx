import { faTrash } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  createLanguageList,
  DEFAULT_LANGUAGES,
  getLanguageIdentifier,
} from '@uidu/adf-schema';
import { findParentNodeOfType } from 'prosemirror-utils';
import React from 'react';
import { defineMessages } from 'react-intl';
import commonMessages from '../../messages';
import { Command } from '../../types';
import { hoverDecoration } from '../base/pm-plugins/decoration';
import {
  FloatingToolbarButton,
  FloatingToolbarHandler,
  FloatingToolbarSelect,
  FloatingToolbarSeparator,
} from '../floating-toolbar/types';
import { changeLanguage, removeCodeBlock } from './actions';
import { CodeBlockState, pluginKey } from './pm-plugins/main';

export const messages = defineMessages({
  selectLanguage: {
    id: 'uidu.editor-core.selectLanguage',
    defaultMessage: 'Select language',
    description:
      'Code blocks display software code. A prompt to select the software language the code is written in.',
  },
});

const languageList = createLanguageList(DEFAULT_LANGUAGES);

export const getToolbarConfig: FloatingToolbarHandler = (
  state,
  { formatMessage },
) => {
  const codeBlockState: CodeBlockState | undefined = pluginKey.getState(state);
  if (
    codeBlockState &&
    codeBlockState.toolbarVisible &&
    codeBlockState.element
  ) {
    const parent = findParentNodeOfType(state.schema.nodes.codeBlock)(
      state.selection,
    );

    const language =
      parent && parent.node.attrs ? parent.node.attrs.language : undefined;

    const options = languageList.map((lang) => ({
      label: lang.name,
      value: getLanguageIdentifier(lang),
    }));

    const languageSelect: FloatingToolbarSelect<Command> = {
      type: 'select',
      onChange: (option) => changeLanguage(option.value),
      defaultValue: language
        ? options.find((option) => option.value === language)
        : undefined,
      placeholder: formatMessage(messages.selectLanguage),
      options,
    };

    const separator: FloatingToolbarSeparator = {
      type: 'separator',
    };

    const nodeType = state.schema.nodes.codeBlock;

    const deleteButton: FloatingToolbarButton<Command> = {
      type: 'button',
      appearance: 'danger',
      icon: () => <FontAwesomeIcon tw="text-base" icon={faTrash} />,
      onMouseEnter: hoverDecoration(nodeType, true),
      onMouseLeave: hoverDecoration(nodeType, false),
      onClick: removeCodeBlock,
      title: formatMessage(commonMessages.remove),
    };

    return {
      title: 'CodeBlock floating controls',
      getDomRef: () => codeBlockState.element,
      nodeType,
      items: [languageSelect, separator, deleteButton],
    };
  }
  return undefined;
};
