import { faEllipsis } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { akEditorMenuZIndex } from '@uidu/editor-common';
import { EditorView } from 'prosemirror-view';
import React, { PureComponent } from 'react';
import { defineMessages, injectIntl, WrappedComponentProps } from 'react-intl';
import {
  clearFormatting as clearFormattingKeymap,
  toggleCode,
  toggleStrikethrough,
  toggleUnderline,
  tooltip,
} from '../../../../keymaps';
import DropdownMenu from '../../../../ui/DropdownMenu';
import { MenuItem } from '../../../../ui/DropdownMenu/types';
import {
  Separator,
  Shortcut,
  TriggerWrapper,
  Wrapper,
} from '../../../../ui/styles';
import ToolbarButton from '../../../../ui/ToolbarButton';
import { clearFormatting } from '../../commands/clear-formatting';
import * as commands from '../../commands/text-formatting';
import { ClearFormattingState } from '../../pm-plugins/clear-formatting';
import { TextFormattingState } from '../../pm-plugins/main';

export interface Props {
  isDisabled?: boolean;
  editorView: EditorView;
  textFormattingState?: TextFormattingState;
  clearFormattingState?: ClearFormattingState;
  popupsMountPoint?: HTMLElement;
  popupsBoundariesElement?: HTMLElement;
  popupsScrollableElement?: HTMLElement;
  isReducedSpacing?: boolean;
}

export const messages = defineMessages({
  underline: {
    id: 'uidu.editor-core.underline',
    defaultMessage: 'Underline',
    description: 'Whether the text selection has underlined text',
  },
  strike: {
    id: 'uidu.editor-core.strike',
    defaultMessage: 'Strikethrough',
    description: 'Whether the text selection has crossed out text',
  },
  code: {
    id: 'uidu.editor-core.code',
    defaultMessage: 'Code',
    description: 'Whether the text selection has monospaced/code font',
  },
  subscript: {
    id: 'uidu.editor-core.subscript',
    defaultMessage: 'Subscript',
    description:
      'Whether the text selection is written below the line in a slightly smaller size',
  },
  superscript: {
    id: 'uidu.editor-core.superscript',
    defaultMessage: 'Superscript',
    description:
      'Whether the text selection is written above the line in a slightly smaller size',
  },
  clearFormatting: {
    id: 'uidu.editor-core.clearFormatting',
    defaultMessage: 'Clear formatting',
    description: 'Remove all rich text formatting from the selected text',
  },
  moreFormatting: {
    id: 'uidu.editor-core.moreFormatting',
    defaultMessage: 'More formatting',
    description:
      'Clicking this will show a menu with additional formatting options',
  },
});

export interface State {
  isOpen?: boolean;
}

class ToolbarAdvancedTextFormatting extends PureComponent<
  Props & WrappedComponentProps,
  State
> {
  state: State = {
    isOpen: false,
  };

  private onOpenChange = (attrs: any) => {
    this.setState({
      isOpen: attrs.isOpen,
    });
  };

  private handleTriggerClick = () => {
    this.onOpenChange({ isOpen: !this.state.isOpen });
  };

  render() {
    const { isOpen } = this.state;
    const {
      popupsMountPoint,
      popupsBoundariesElement,
      popupsScrollableElement,
      isReducedSpacing,
      textFormattingState = {},
      clearFormattingState = {},
      intl: { formatMessage },
    } = this.props;
    const {
      codeActive,
      underlineActive,
      strikeActive,
      subscriptActive,
      superscriptActive,
      codeDisabled,
      underlineDisabled,
      strikeDisabled,
      subscriptDisabled,
      superscriptDisabled,
    } = textFormattingState;
    const { formattingIsPresent } = clearFormattingState;
    const items = this.createItems();
    const labelMoreFormatting = formatMessage(messages.moreFormatting);

    const toolbarButtonFactory = (disabled: boolean) => (
      <ToolbarButton
        spacing={isReducedSpacing ? 'none' : 'default'}
        selected={
          isOpen ||
          underlineActive ||
          codeActive ||
          strikeActive ||
          subscriptActive ||
          superscriptActive
        }
        disabled={disabled}
        onClick={this.handleTriggerClick}
        title={labelMoreFormatting}
        iconBefore={
          <TriggerWrapper>
            <FontAwesomeIcon tw="text-base" icon={faEllipsis} />
          </TriggerWrapper>
        }
      />
    );

    if (
      !this.props.isDisabled &&
      !(
        strikeDisabled &&
        !formattingIsPresent &&
        codeDisabled &&
        subscriptDisabled &&
        superscriptDisabled &&
        underlineDisabled
      ) &&
      items[0].items.length > 0
    ) {
      return (
        <Wrapper>
          <DropdownMenu
            items={items}
            onItemActivated={this.onItemActivated}
            onOpenChange={this.onOpenChange}
            mountTo={popupsMountPoint}
            boundariesElement={popupsBoundariesElement}
            scrollableElement={popupsScrollableElement}
            isOpen={isOpen}
            zIndex={akEditorMenuZIndex}
            fitHeight={188}
            fitWidth={136}
          >
            {toolbarButtonFactory(false)}
          </DropdownMenu>
          <Separator />
        </Wrapper>
      );
    } else {
      return (
        <Wrapper>
          <div>{toolbarButtonFactory(true)}</div>
          <Separator />
        </Wrapper>
      );
    }
  }

  private createItems = () => {
    const {
      textFormattingState,
      clearFormattingState,
      editorView,
      intl: { formatMessage },
    } = this.props;
    const { code, underline, subsup, strike } = editorView.state.schema.marks;
    let items: MenuItem[] = [];

    if (textFormattingState) {
      const {
        underlineHidden,
        codeHidden,
        strikeHidden,
        subscriptHidden,
        superscriptHidden,
      } = textFormattingState;
      if (!underlineHidden && underline) {
        this.addRecordToItems(
          items,
          formatMessage(messages.underline),
          'underline',
          tooltip(toggleUnderline),
        );
      }
      if (!strikeHidden && strike) {
        this.addRecordToItems(
          items,
          formatMessage(messages.strike),
          'strike',
          tooltip(toggleStrikethrough),
        );
      }
      if (!codeHidden && code) {
        this.addRecordToItems(
          items,
          formatMessage(messages.code),
          'code',
          tooltip(toggleCode),
        );
      }
      if (!subscriptHidden && subsup) {
        this.addRecordToItems(
          items,
          formatMessage(messages.subscript),
          'subscript',
        );
      }
      if (!superscriptHidden && subsup) {
        this.addRecordToItems(
          items,
          formatMessage(messages.superscript),
          'superscript',
        );
      }
    }
    if (clearFormattingState) {
      this.addRecordToItems(
        items,
        formatMessage(messages.clearFormatting),
        'clearFormatting',
        tooltip(clearFormattingKeymap),
        !clearFormattingState.formattingIsPresent,
      );
    }
    return [{ items }];
  };

  private addRecordToItems = (
    items: MenuItem[],
    content: string,
    value: string,
    tooltip?: string,
    isDisabled?: boolean,
  ) => {
    let active = false;
    let disabled = false;
    if (this.props.textFormattingState) {
      active =
        this.props.textFormattingState![
          `${value}Active` as keyof TextFormattingState
        ] || false;
      disabled =
        isDisabled ||
        this.props.textFormattingState![
          `${value}Disabled` as keyof TextFormattingState
        ] ||
        false;
    }
    items.push({
      key: value,
      content,
      elemAfter: tooltip ? <Shortcut>{tooltip}</Shortcut> : undefined,
      value: {
        name: value,
      },
      isActive: active,
      isDisabled: disabled,
    });
  };

  private onItemActivated = ({ item }: { item: MenuItem }) => {
    const { state, dispatch } = this.props.editorView;
    switch (item.value.name) {
      case 'underline':
        commands.toggleUnderline()(state, dispatch);
        break;
      case 'code':
        commands.toggleCode()(state, dispatch);
        break;
      case 'strike':
        commands.toggleStrike()(state, dispatch);
        break;
      case 'subscript':
        commands.toggleSubscript()(state, dispatch);
        break;
      case 'superscript':
        commands.toggleSuperscript()(state, dispatch);
        break;
      case 'clearFormatting':
        clearFormatting()(state, dispatch);
        break;
    }
    this.setState({ isOpen: false });
  };
}

export default injectIntl(ToolbarAdvancedTextFormatting);
