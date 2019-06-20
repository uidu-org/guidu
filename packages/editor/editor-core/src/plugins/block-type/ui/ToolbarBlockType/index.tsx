import { akEditorMenuZIndex } from '@atlaskit/editor-common';
import ExpandIcon from '@atlaskit/icon/glyph/chevron-down';
import TextStyleIcon from '@atlaskit/icon/glyph/editor/text-style';
import * as React from 'react';
import { createElement, ReactElement } from 'react';
import {
  defineMessages,
  FormattedMessage,
  InjectedIntlProps,
  injectIntl,
} from 'react-intl';
import { analyticsService as analytics } from '../../../../analytics';
import DropdownMenu from '../../../../components/DropdownMenu';
import {
  ButtonContent,
  ExpandIconWrapper,
  MenuWrapper,
  Separator,
  Wrapper,
} from '../../../../components/styles';
import ToolbarButton from '../../../../components/ToolbarButton';
import { BlockTypeState } from '../../pm-plugins/main';
import { BlockType, NORMAL_TEXT } from '../../types';
import { BlockTypeMenuItem } from './styled';

export const messages = defineMessages({
  textStyles: {
    id: 'fabric.editor.textStyles',
    defaultMessage: 'Text styles',
    description:
      'Menu provides access to various heading styles or normal text',
  },
});

export type DropdownItem = {
  content: ReactElement<any>;
  key: string;
  value: BlockType;
  isActive: boolean;
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

class ToolbarBlockType extends React.PureComponent<
  Props & InjectedIntlProps,
  State
> {
  state = {
    active: false,
  };

  private onOpenChange = (attrs: any) => {
    this.setState({ active: attrs.isOpen });
  };

  render() {
    const { active } = this.state;
    const {
      popupsMountPoint,
      popupsBoundariesElement,
      popupsScrollableElement,
      isSmall,
      isReducedSpacing,
      pluginState: {
        currentBlockType,
        blockTypesDisabled,
        availableBlockTypes,
      },
      intl: { formatMessage },
    } = this.props;

    const isHeadingDisabled = !availableBlockTypes.some(
      blockType => blockType.nodeName === 'heading',
    );

    if (isHeadingDisabled) {
      return null;
    }

    const blockTypeTitles = availableBlockTypes
      .filter(blockType => blockType.name === currentBlockType.name)
      .map(blockType => blockType.title);

    const longestDropdownMenuItem = [
      NORMAL_TEXT,
      ...availableBlockTypes,
    ].reduce((longest, item) => {
      const itemTitle = formatMessage(item.title);
      return itemTitle.length >= longest.length ? itemTitle : longest;
    }, '');

    const toolbarButtonFactory = (disabled: boolean) => {
      const labelTextStyles = formatMessage(messages.textStyles);
      return (
        <ToolbarButton
          spacing={isReducedSpacing ? 'none' : 'default'}
          selected={active}
          className="block-type-btn"
          disabled={disabled}
          onClick={this.handleTriggerClick}
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
              <FormattedMessage
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

    if (!this.props.isDisabled && !blockTypesDisabled) {
      const items = this.createItems();
      return (
        <MenuWrapper>
          <DropdownMenu
            items={items}
            onOpenChange={this.onOpenChange}
            onItemActivated={this.handleSelectBlockType}
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

  private handleTriggerClick = () => {
    this.onOpenChange({ isOpen: !this.state.active });
  };

  private createItems = () => {
    const {
      intl: { formatMessage },
    } = this.props;
    const { currentBlockType, availableBlockTypes } = this.props.pluginState;
    const items = availableBlockTypes.reduce(
      (acc, blockType, blockTypeNo) => {
        const isActive = currentBlockType === blockType;
        const tagName = blockType.tagName || 'p';
        acc.push({
          content: (
            <BlockTypeMenuItem tagName={tagName} selected={isActive}>
              {createElement(tagName, {}, formatMessage(blockType.title))}
            </BlockTypeMenuItem>
          ),
          value: blockType,
          key: `${blockType}-${blockTypeNo}`,
          // ED-2853, hiding tooltips as shortcuts are not working atm.
          // tooltipDescription: tooltip(findKeymapByDescription(blockType.title)),
          // tooltipPosition: 'right',
          isActive,
        });
        return acc;
      },
      [] as Array<DropdownItem>,
    );
    return [{ items }];
  };

  private handleSelectBlockType = ({ item }: { item: DropdownItem }) => {
    const blockType = item.value;
    this.props.setBlockType(blockType.name);
    this.setState({ active: false });

    analytics.trackEvent(`atlassian.editor.format.${blockType.name}.button`);
  };
}

export default injectIntl(ToolbarBlockType);
