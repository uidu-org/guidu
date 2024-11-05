import ExpandIcon from '@atlaskit/icon/glyph/chevron-down';
import { faListOl, faListUl } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ButtonGroup } from '@uidu/button';
import { EditorView } from 'prosemirror-view';
import * as React from 'react';
import { PureComponent } from 'react';
import { injectIntl, WrappedComponentProps } from 'react-intl';
import {
  renderTooltipContent,
  toggleBulletList as toggleBulletListKeymap,
  toggleOrderedList as toggleOrderedListKeymap,
  tooltip,
} from '../../../../keymaps';
import DropdownMenu from '../../../../ui/DropdownMenu';
import {
  ExpandIconWrapper,
  Separator,
  Shortcut,
  Wrapper,
} from '../../../../ui/styles';
import ToolbarButton from '../../../../ui/ToolbarButton';
import { INPUT_METHOD } from '../../../analytics';
import { DropdownItem } from '../../../block-type/ui/ToolbarBlockType';
import { TOOLBAR_MENU_TYPE } from '../../../insert-block/ui/ToolbarInsertBlock/types';
import { toggleBulletList, toggleOrderedList } from '../../commands';
import { messages } from '../../messages';

export interface Props {
  editorView: EditorView;
  bulletListActive?: boolean;
  bulletListDisabled?: boolean;
  orderedListActive?: boolean;
  orderedListDisabled?: boolean;
  disabled?: boolean;
  isSmall?: boolean;
  isSeparator?: boolean;
  isReducedSpacing?: boolean;
  popupsMountPoint?: HTMLElement;
  popupsBoundariesElement?: HTMLElement;
  popupsScrollableElement?: HTMLElement;
}

export interface State {
  isDropdownOpen: boolean;
}

class ToolbarLists extends PureComponent<Props & WrappedComponentProps, State> {
  state: State = {
    isDropdownOpen: false,
  };

  private onOpenChange = (attrs: any) => {
    this.setState({
      isDropdownOpen: attrs.isDropdownOpen,
    });
  };

  private handleTriggerClick = () => {
    this.onOpenChange({ isDropdownOpen: !this.state.isDropdownOpen });
  };

  createItems = () => {
    const {
      bulletListDisabled,
      orderedListDisabled,
      bulletListActive,
      orderedListActive,
      intl: { formatMessage },
    } = this.props;
    const labelUnorderedList = formatMessage(messages.unorderedList);
    const labelOrderedList = formatMessage(messages.orderedList);

    let items = [
      {
        key: 'unorderedList',
        content: labelUnorderedList,
        value: { name: 'bullet_list' },
        isDisabled: bulletListDisabled,
        isActive: Boolean(bulletListActive),
        elemAfter: <Shortcut>{tooltip(toggleBulletListKeymap)}</Shortcut>,
      },
      {
        key: 'orderedList',
        content: labelOrderedList,
        value: { name: 'ordered_list' },
        isDisabled: orderedListDisabled,
        isActive: Boolean(orderedListActive),
        elemAfter: <Shortcut>{tooltip(toggleOrderedListKeymap)}</Shortcut>,
      },
    ];
    return [{ items }];
  };

  render() {
    const {
      disabled,
      isSmall,
      isReducedSpacing,
      isSeparator,
      bulletListActive,
      bulletListDisabled,
      orderedListActive,
      orderedListDisabled,
      intl: { formatMessage },
    } = this.props;
    const { isDropdownOpen } = this.state;
    if (!isSmall) {
      const labelUnorderedList = formatMessage(messages.unorderedList);
      const labelOrderedList = formatMessage(messages.orderedList);
      return (
        <>
          <ButtonGroup tw="space-x-0">
            <ToolbarButton
              spacing={isReducedSpacing ? 'none' : 'default'}
              onClick={this.handleBulletListClick}
              selected={bulletListActive}
              disabled={bulletListDisabled || disabled}
              title={renderTooltipContent(
                labelUnorderedList,
                toggleBulletListKeymap,
              )}
              iconBefore={
                <FontAwesomeIcon
                  icon={faListUl}
                  label={labelUnorderedList}
                  tw="h-4 w-4"
                />
              }
            />
            <ToolbarButton
              spacing={isReducedSpacing ? 'none' : 'default'}
              onClick={this.handleOrderedListClick}
              selected={orderedListActive}
              disabled={orderedListDisabled || disabled}
              title={renderTooltipContent(
                labelOrderedList,
                toggleOrderedListKeymap,
              )}
              iconBefore={
                <FontAwesomeIcon
                  icon={faListOl}
                  label={labelOrderedList}
                  tw="h-4 w-4"
                />
              }
            />
          </ButtonGroup>
          {isSeparator && <Separator />}
        </>
      );
    } else {
      const items = this.createItems();
      const {
        popupsMountPoint,
        popupsBoundariesElement,
        popupsScrollableElement,
      } = this.props;

      const labelLists = formatMessage(messages.lists);
      return (
        <>
          <Wrapper>
            <DropdownMenu
              items={items}
              onItemActivated={this.onItemActivated}
              mountTo={popupsMountPoint}
              boundariesElement={popupsBoundariesElement}
              scrollableElement={popupsScrollableElement}
              isOpen={isDropdownOpen}
              onOpenChange={this.onOpenChange}
              fitHeight={188}
              fitWidth={175}
            >
              <ToolbarButton
                spacing={isReducedSpacing ? 'none' : 'default'}
                selected={bulletListActive || orderedListActive}
                disabled={disabled}
                onClick={this.handleTriggerClick}
                title={labelLists}
                iconBefore={
                  <Wrapper>
                    <FontAwesomeIcon icon={faListUl} label={labelLists} />
                    <ExpandIconWrapper>
                      <ExpandIcon label={labelLists} />
                    </ExpandIconWrapper>
                  </Wrapper>
                }
              />
            </DropdownMenu>
          </Wrapper>
          {isSeparator && <Separator />}
        </>
      );
    }
  }

  private handleBulletListClick = () => {
    if (!this.props.bulletListDisabled) {
      if (toggleBulletList(this.props.editorView, INPUT_METHOD.TOOLBAR)) {
        return true;
      }
    }
    return false;
  };

  private handleOrderedListClick = () => {
    if (!this.props.orderedListDisabled) {
      if (toggleOrderedList(this.props.editorView, INPUT_METHOD.TOOLBAR)) {
        return true;
      }
    }
    return false;
  };

  private onItemActivated = ({
    item,
  }: {
    item: DropdownItem;
    inputMethod: TOOLBAR_MENU_TYPE;
  }) => {
    this.setState({ isDropdownOpen: false });
    switch (item.value.name) {
      case 'bullet_list':
        this.handleBulletListClick();
        break;
      case 'ordered_list':
        this.handleOrderedListClick();
        break;
    }
  };
}

export default injectIntl(ToolbarLists);
