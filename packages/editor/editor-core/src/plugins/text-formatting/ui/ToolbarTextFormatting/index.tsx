import { faBold, faItalic } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ButtonGroup } from '@uidu/button';
import { EditorView } from 'prosemirror-view';
import React, { PureComponent } from 'react';
import { defineMessages, injectIntl, WrappedComponentProps } from 'react-intl';
import { withAnalytics } from '../../../../analytics';
import {
  renderTooltipContent,
  toggleBold,
  toggleItalic,
} from '../../../../keymaps';
import ToolbarButton from '../../../../ui/ToolbarButton';
import { INPUT_METHOD } from '../../../analytics';
import {
  toggleEmWithAnalytics,
  toggleStrongWithAnalytics,
} from '../../commands/text-formatting';
import { TextFormattingState } from '../../pm-plugins/main';

export const messages = defineMessages({
  bold: {
    id: 'uidu.editor-core.bold',
    defaultMessage: 'Bold',
    description:
      'This refers to bold or “strong” formatting, indicates that its contents have strong importance, seriousness, or urgency.',
  },
  italic: {
    id: 'uidu.editor-core.italic',
    defaultMessage: 'Italic',
    description: 'This refers to italics or emphasized formatting.',
  },
});

export interface Props {
  editorView: EditorView;
  textFormattingState: TextFormattingState;
  disabled?: boolean;
  isReducedSpacing?: boolean;
}

class ToolbarTextFormatting extends PureComponent<
  Props & WrappedComponentProps
> {
  render() {
    const {
      disabled,
      isReducedSpacing,
      textFormattingState,
      intl: { formatMessage },
    } = this.props;
    const {
      strongHidden,
      strongActive,
      strongDisabled,
      emHidden,
      emActive,
      emDisabled,
    } = textFormattingState || {};

    const labelBold = formatMessage(messages.bold);
    const labelItalic = formatMessage(messages.italic);
    return (
      <ButtonGroup tw="space-x-0">
        {strongHidden ? null : (
          <ToolbarButton
            spacing={isReducedSpacing ? 'none' : 'default'}
            onClick={this.handleBoldClick}
            selected={strongActive}
            disabled={disabled || strongDisabled}
            title={renderTooltipContent(labelBold, toggleBold)}
            iconBefore={
              <FontAwesomeIcon icon={faBold} tw="h-4 w-4" label={labelBold} />
            }
          />
        )}

        {emHidden ? null : (
          <ToolbarButton
            spacing={isReducedSpacing ? 'none' : 'default'}
            onClick={this.handleItalicClick}
            selected={emActive}
            disabled={disabled || emDisabled}
            title={renderTooltipContent(labelItalic, toggleItalic)}
            iconBefore={
              <FontAwesomeIcon
                icon={faItalic}
                tw="h-4 w-4"
                label={labelItalic}
              />
            }
          />
        )}
      </ButtonGroup>
    );
  }

  private handleBoldClick = withAnalytics(
    'uidu.editor-core.format.strong.button',
    () => {
      const { strongDisabled } = this.props.textFormattingState;
      if (!strongDisabled) {
        const { state, dispatch } = this.props.editorView;
        return toggleStrongWithAnalytics({ inputMethod: INPUT_METHOD.TOOLBAR })(
          state,
          dispatch,
        );
      }
      return false;
    },
  );

  private handleItalicClick = withAnalytics(
    'uidu.editor-core.format.em.button',
    (): boolean => {
      const { emDisabled } = this.props.textFormattingState;
      if (!emDisabled) {
        const { state, dispatch } = this.props.editorView;
        return toggleEmWithAnalytics({ inputMethod: INPUT_METHOD.TOOLBAR })(
          state,
          dispatch,
        );
      }
      return false;
    },
  );
}

export default injectIntl(ToolbarTextFormatting);
