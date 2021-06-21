import ExpandIcon from '@atlaskit/icon/glyph/chevron-down';
import TextStyleIcon from '@atlaskit/icon/glyph/editor/text-style';
import { akEditorMenuZIndex } from '@uidu/editor-common';
import React, { createElement, useState } from 'react';
import { defineMessages, FormattedMessage, useIntl } from 'react-intl';
import { analyticsService as analytics } from '../../../../analytics';
import { findKeymapByDescription, tooltip } from '../../../../keymaps';
import DropdownMenu from '../../../../ui/DropdownMenu';
import { MenuItem } from '../../../../ui/DropdownMenu/types';
import {
  ButtonContent,
  ExpandIconWrapper,
  MenuWrapper,
  Separator,
  Wrapper,
} from '../../../../ui/styles';
import ToolbarButton from '../../../../ui/ToolbarButton';
import { BlockTypeState } from '../../pm-plugins/main';
import { BlockType, NORMAL_TEXT } from '../../types';
import { BlockTypeMenuItem, KeyboardShortcut } from './styled';

export const messages = defineMessages({
  textStyles: {
    id: 'fabric.editor.textStyles',
    defaultMessage: 'Text styles',
    description:
      'Menu provides access to various heading styles or normal text',
  },
});

export type DropdownItem = MenuItem & {
  value: BlockType;
};

export interface Props {
  isDisabled?: boolean;
  isSmall?: boolean;
  isReducedSpacing?: boolean;
  pluginState: BlockTypeState;
  popupsMountPoint?: HTMLElement;
  popupsBoundariesElement?: HTMLElement;
  popupsScrollableElement?: HTMLElement;
  setBlockType: (type: string) => void;
}

export interface State {
  active: boolean;
}

export default function ToolbarBlockType({
  popupsMountPoint,
  popupsBoundariesElement,
  popupsScrollableElement,
  isSmall,
  isReducedSpacing,
  setBlockType,
  isDisabled,
  pluginState: { currentBlockType, blockTypesDisabled, availableBlockTypes },
}: Props) {
  const [active, setActive] = useState(false);
  const { formatMessage } = useIntl();

  const isHeadingDisabled = !availableBlockTypes.some(
    (blockType) => blockType.nodeName === 'heading',
  );

  if (isHeadingDisabled) {
    return null;
  }

  const blockTypeTitles = availableBlockTypes
    .filter((blockType) => blockType.name === currentBlockType.name)
    .map((blockType) => blockType.title);

  const longestDropdownMenuItem = [NORMAL_TEXT, ...availableBlockTypes].reduce(
    (longest, item) => {
      const itemTitle = formatMessage(item.title);
      return itemTitle.length >= longest.length ? itemTitle : longest;
    },
    '',
  );

  const toolbarButtonFactory = (disabled: boolean) => {
    const labelTextStyles = formatMessage(messages.textStyles);
    return (
      <ToolbarButton
        spacing={isReducedSpacing ? 'none' : 'default'}
        selected={active}
        className="block-type-btn"
        disabled={disabled}
        onClick={() => setActive((prevActive) => !prevActive)}
        title={labelTextStyles}
        aria-label="Font style"
        iconAfter={
          <Wrapper isSmall={isSmall}>
            {isSmall && <TextStyleIcon label={labelTextStyles} />}
            <ExpandIconWrapper>
              <ExpandIcon label={labelTextStyles} />
            </ExpandIconWrapper>
          </Wrapper>
        }
      >
        {!isSmall && (
          <ButtonContent>
            <FormattedMessage // eslint-disable-next-line react/jsx-props-no-spreading
              {...(blockTypeTitles[0] || NORMAL_TEXT.title)}
            />
            <div style={{ overflow: 'hidden', height: 0 }}>
              {longestDropdownMenuItem}
            </div>
          </ButtonContent>
        )}
      </ToolbarButton>
    );
  };

  const handleTriggerClick = () => {
    setActive((prevActive) => !prevActive);
  };

  const createItems = () => {
    const items = availableBlockTypes.reduce((acc, blockType, blockTypeNo) => {
      const isSelected = currentBlockType === blockType;
      const tagName = blockType.tagName || 'p';
      acc.push({
        content: (
          <BlockTypeMenuItem>
            {createElement(tagName, {}, formatMessage(blockType.title))}
          </BlockTypeMenuItem>
        ),
        value: blockType,
        key: `${blockType.name}-${blockTypeNo}`,
        iconAfter: (
          <KeyboardShortcut selected={isSelected}>
            {tooltip(
              findKeymapByDescription(blockType.title.defaultMessage[0].value),
            )}
          </KeyboardShortcut>
        ),
        isSelected,
      });
      return acc;
    }, [] as Array<DropdownItem>);
    return [{ items }];
  };

  const handleSelectBlockType = ({ item }: { item: DropdownItem }) => {
    const blockType = item.value;
    setBlockType(blockType.name);
    setActive(false);

    analytics.trackEvent(`atlassian.editor.format.${blockType.name}.button`);
  };

  if (!isDisabled && !blockTypesDisabled) {
    const items = createItems();
    return (
      <MenuWrapper>
        <DropdownMenu
          items={items}
          // onOpenChange={() => setActive((prevActive) => !prevActive)}
          onItemActivated={handleSelectBlockType}
          isOpen={active}
          mountTo={popupsMountPoint}
          boundariesElement={popupsBoundariesElement}
          scrollableElement={popupsScrollableElement}
          zIndex={akEditorMenuZIndex}
          fitHeight={360}
          fitWidth={106}
        >
          {toolbarButtonFactory(false)}
        </DropdownMenu>
        <Separator />
      </MenuWrapper>
    );
  }

  return (
    <Wrapper>
      {toolbarButtonFactory(true)}
      <Separator />
    </Wrapper>
  );
}
