import ChevronLeftLargeIcon from '@atlaskit/icon/glyph/chevron-left-large';
import CrossCircleIcon from '@atlaskit/icon/glyph/cross-circle';
import { ErrorMessage } from '@uidu/editor-common';
import { colors } from '@uidu/theme';
import { EditorView } from 'prosemirror-view';
import React, { KeyboardEvent } from 'react';
import { injectIntl, WrappedComponentProps } from 'react-intl';
import styled from 'styled-components';
import * as keymaps from '../../../../../keymaps';
import PanelTextInput from '../../../../../ui/PanelTextInput';
import { RECENT_SEARCH_WIDTH_IN_PX } from '../../../../../ui/RecentSearch/ToolbarComponents';
import Button from '../../../../floating-toolbar/ui/Button';
import { closeMediaAltTextMenu, updateAltText } from '../commands';
import { messages } from '../messages';

export const CONTAINER_WIDTH_IN_PX = RECENT_SEARCH_WIDTH_IN_PX;
export const MAX_ALT_TEXT_LENGTH = 510; // double tweet length

const SupportText = styled.p`
  color: ${colors.N100};
  font-size: 12px;
  padding: 12px 40px;
  line-height: 20px;
  border-top: 1px solid ${colors.N30};
  margin: 0;
`;

const Container = styled.div`
  width: ${CONTAINER_WIDTH_IN_PX}px;
  display: flex;
  flex-direction: column;
  overflow: auto;
  line-height: 2;
`;

const InputWrapper = styled.section`
  display: flex;
  line-height: 0;
  padding: 5px 0;
  align-items: center;
`;

const ValidationWrapper = styled.section`
  display: flex;
  line-height: 0;
  padding: 12px 24px 12px 0;
  margin: 0 12px 0 40px;
  border-top: 1px solid ${colors.R400};
  align-items: start;
  display: flex;
  flex-direction: column;
`;

const ButtonWrapper = styled.div`
  display: flex;
  padding: 4px 8px;
`;

const ClearText = styled.span`
  color: ${colors.N80};
`;

type Props = {
  view: EditorView;
  value?: string;
  altTextValidator?: (value: string) => string[];
} & WrappedComponentProps;

export type AltTextEditComponentState = {
  showClearTextButton: boolean;
  validationErrors: string[] | undefined;
  lastValue: string | undefined;
};

export class AltTextEditComponent extends React.Component<
  Props,
  AltTextEditComponentState
> {
  state = {
    showClearTextButton: Boolean(this.props.value),
    validationErrors: this.props.value
      ? this.getValidationErrors(this.props.value)
      : [],
    lastValue: this.props.value,
  };

  constructor(props: Props) {
    super(props);
  }

  prevValue: string | undefined;

  componentDidMount() {
    this.prevValue = this.props.value;
  }

  componentWillUnmount() {}

  private getValidationErrors(value: string): string[] {
    const { altTextValidator } = this.props;
    if (value && typeof altTextValidator === 'function') {
      return altTextValidator(value) || [];
    }
    return [];
  }

  render() {
    const {
      intl: { formatMessage },
    } = this.props;
    const { showClearTextButton } = this.state;

    const backButtonMessage = formatMessage(messages.back);
    const backButtonMessageComponent = keymaps.renderTooltipContent(
      backButtonMessage,
      keymaps.escape,
      'Esc',
    );

    const errorsList = (this.state.validationErrors || []).map(
      function (error, index) {
        return <ErrorMessage key={index}>{error}</ErrorMessage>;
      },
    );

    return (
      <Container>
        <InputWrapper>
          <ButtonWrapper>
            <Button
              title={formatMessage(messages.back)}
              icon={
                <ChevronLeftLargeIcon label={formatMessage(messages.back)} />
              }
              // tooltipContent={backButtonMessageComponent}
              onClick={this.closeMediaAltTextMenu}
            />
          </ButtonWrapper>
          <PanelTextInput
            placeholder={formatMessage(messages.placeholder)}
            defaultValue={this.state.lastValue}
            onCancel={this.dispatchCancelEvent}
            onChange={this.handleOnChange}
            onBlur={this.handleOnBlur}
            onSubmit={this.closeMediaAltTextMenu}
            maxLength={MAX_ALT_TEXT_LENGTH}
            autoFocus
          />
          {showClearTextButton && (
            <ButtonWrapper>
              <Button
                title={formatMessage(messages.clear)}
                icon={
                  <ClearText>
                    <CrossCircleIcon label={formatMessage(messages.clear)} />
                  </ClearText>
                }
                // tooltipContent={formatMessage(messages.clear)}
                onClick={this.handleClearText}
              />
            </ButtonWrapper>
          )}
        </InputWrapper>
        {!!errorsList.length && (
          <ValidationWrapper>{errorsList}</ValidationWrapper>
        )}
        <SupportText>{formatMessage(messages.supportText)}</SupportText>
      </Container>
    );
  }

  private closeMediaAltTextMenu = () => {
    const { view } = this.props;
    closeMediaAltTextMenu(view.state, view.dispatch);
  };

  private dispatchCancelEvent = (event: KeyboardEvent) => {
    const { view } = this.props;

    // We need to pass down the ESCAPE keymap
    // because when we focus on the Toolbar, Prosemirror blur,
    // making all keyboard shortcuts not working
    view.someProp('handleKeyDown', (fn: any) => fn(view, event));
  };

  private updateAltText = (newAltText: string) => {
    const { view } = this.props;
    const newValue = newAltText.length === 0 ? null : newAltText;
    updateAltText(newValue)(view.state, view.dispatch);
  };

  private handleOnChange = (newAltText: string) => {
    const validationErrors = this.getValidationErrors(newAltText);

    this.setState(
      {
        showClearTextButton: Boolean(newAltText),
        validationErrors,
        lastValue: newAltText,
      },
      () => {
        if (!validationErrors || !validationErrors.length) {
          this.updateAltText(newAltText);
        }
      },
    );
  };

  private handleOnBlur = () => {
    // Handling the trimming onBlur() because PanelTextInput doesn't sync
    // defaultValue properly during unmount
    const { value } = this.props;
    const newValue = (this.state.lastValue || value || '').trim();
    this.handleOnChange(newValue);
  };

  private handleClearText = () => {
    this.handleOnChange('');
  };
}

export default injectIntl(AltTextEditComponent);
