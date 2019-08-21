import BoldIcon from '@atlaskit/icon/glyph/editor/bold';
import ItalicIcon from '@atlaskit/icon/glyph/editor/italic';
import { EditorView } from 'prosemirror-view';
import * as React from 'react';
import { PureComponent } from 'react';
import {
  defineMessages,
  FormattedMessage,
  injectIntl,
  WrappedComponentProps,
} from 'react-intl';
import { withAnalytics } from '../../../../analytics';
import { ButtonGroup } from '../../../../components/styles';
import ToolbarButton from '../../../../components/ToolbarButton';
import { toggleBold, toggleItalic, tooltip } from '../../../../keymaps';
import { INPUT_METHOD } from '../../../analytics';
import {
  toggleEmWithAnalytics,
  toggleStrongWithAnalytics,
} from '../../commands/text-formatting';
import { TextFormattingState } from '../../pm-plugins/main';

export const messages = defineMessages({
  bold: {
    id: 'fabric.editor.bold',
    defaultMessage: 'Bold',
    description:
      'This refers to bold or “strong” formatting, indicates that its contents have strong importance, seriousness, or urgency.',
  },
  italic: {
    id: 'fabric.editor.italic',
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
    const { disabled, isReducedSpacing, textFormattingState } = this.props;
    const {
      strongHidden,
      strongActive,
      strongDisabled,
      emHidden,
      emActive,
      emDisabled,
    } = textFormattingState;

    return (
      <ButtonGroup width={isReducedSpacing ? 'small' : 'large'}>
        {strongHidden ? null : (
          <FormattedMessage {...messages.bold}>
            {(text: string) => (
              <ToolbarButton
                spacing={isReducedSpacing ? 'none' : 'default'}
                onClick={this.handleBoldClick}
                selected={strongActive}
                disabled={disabled || strongDisabled}
                title={tooltip(toggleBold, text)}
                iconBefore={<BoldIcon label={text} />}
              />
            )}
          </FormattedMessage>
        )}

        {emHidden ? null : (
          <FormattedMessage {...messages.italic}>
            {(text: string) => (
              <ToolbarButton
                spacing={isReducedSpacing ? 'none' : 'default'}
                onClick={this.handleItalicClick}
                selected={emActive}
                disabled={disabled || emDisabled}
                title={tooltip(toggleItalic, text)}
                iconBefore={<ItalicIcon label={text} />}
              />
            )}
          </FormattedMessage>
        )}
      </ButtonGroup>
    );
  }

  private handleBoldClick = withAnalytics(
    'atlassian.editor.format.strong.button',
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
    'atlassian.editor.format.em.button',
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
