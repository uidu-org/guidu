import ConfirmIcon from '@atlaskit/icon/glyph/check';
import CancelIcon from '@atlaskit/icon/glyph/cross';
import Button from '@uidu/button';
import Field from '@uidu/field';
import Form from '@uidu/form';
/** This means that InlineDialog is only loaded if necessary */
import InlineDialog from '@uidu/inline-dialog';
import React from 'react';
import ButtonsWrapper from '../styled/ButtonsWrapper';
import ButtonWrapper from '../styled/ButtonWrapper';
import ContentWrapper from '../styled/ContentWrapper';
import EditButton from '../styled/EditButton';
import HiddenButton from '../styled/HiddenButton';
import InlineDialogChild from '../styled/InlineDialogChild';
import ReadViewContentWrapper from '../styled/ReadViewContentWrapper';
import ReadViewWrapper from '../styled/ReadViewWrapper';
import { InlineEditUncontrolledProps } from '../types';

const DRAG_THRESHOLD = 5;

interface State {
  onReadViewHover: boolean;
  wasFocusReceivedSinceLastBlur: boolean;
  preventFocusOnEditButton: boolean;
}

class InlineEditUncontrolled<FieldValue = string> extends React.Component<
  InlineEditUncontrolledProps<FieldValue>,
  State
> {
  static defaultProps = {
    keepEditViewOpenOnBlur: false,
    hideActionButtons: false,
    isRequired: false,
    readViewFitContainerWidth: false,
    editButtonLabel: 'Edit',
    confirmButtonLabel: 'Confirm',
    cancelButtonLabel: 'Cancel',
  };

  editButtonRef?: HTMLElement;

  startX: number = 0;
  startY: number = 0;

  state = {
    onReadViewHover: false,
    wasFocusReceivedSinceLastBlur: false,
    preventFocusOnEditButton: false,
  };

  private confirmationTimeoutId: number | undefined;

  componentDidUpdate(prevProps: InlineEditUncontrolledProps<FieldValue>) {
    /**
     * This logic puts the focus on the edit button after confirming using
     * the confirm button or using the keyboard to confirm, but not when
     * it is confirmed by wrapper blur
     */
    if (prevProps.isEditing && !this.props.isEditing) {
      if (this.state.preventFocusOnEditButton) {
        this.setState({ preventFocusOnEditButton: false });
      } else if (this.editButtonRef) {
        this.editButtonRef.focus();
      }
    }
  }

  componentWillUnmount() {
    window.clearTimeout(this.confirmationTimeoutId);
  }

  onCancelClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    this.props.onCancel();
  };

  onReadViewClick = (
    event: React.MouseEvent<HTMLButtonElement | HTMLDivElement>,
  ) => {
    const element = event.target as HTMLElement;
    /** If a link is clicked in the read view, default action should be taken */
    if (element.tagName.toLowerCase() !== 'a' && !this.mouseHasMoved(event)) {
      event.preventDefault();
      this.props.onEditRequested();
      this.setState({ preventFocusOnEditButton: true });
    }
  };

  mouseHasMoved = (event: { clientX: number; clientY: number }) => {
    return (
      Math.abs(this.startX - event.clientX) >= DRAG_THRESHOLD ||
      Math.abs(this.startY - event.clientY) >= DRAG_THRESHOLD
    );
  };

  /** Unless keepEditViewOpenOnBlur prop is true, will call confirmIfUnfocused() which
   *  confirms the value, unless the focus is transferred to the buttons
   */
  onWrapperBlur = (
    isInvalid: boolean,
    onSubmit: (e?: React.FormEvent<HTMLFormElement>) => void,
    formRef: React.RefObject<HTMLFormElement>,
  ) => {
    if (!this.props.keepEditViewOpenOnBlur) {
      this.setState({ wasFocusReceivedSinceLastBlur: false });
      /**
       * This ensures that clicking on one of the action buttons will call
       * onWrapperFocus before confirmIfUnfocused is called
       */
      this.confirmationTimeoutId = window.setTimeout(() =>
        this.confirmIfUnfocused(isInvalid, onSubmit, formRef),
      );
    }
  };

  /** Gets called when focus is transferred to the editView, or action buttons */
  onWrapperFocus = () => {
    this.setState({ wasFocusReceivedSinceLastBlur: true });
  };

  confirmIfUnfocused = (
    isInvalid: boolean,
    onSubmit: (e?: React.FormEvent<HTMLFormElement>) => void,
    formRef: React.RefObject<HTMLFormElement>,
  ) => {
    if (
      !isInvalid &&
      !this.state.wasFocusReceivedSinceLastBlur &&
      formRef.current
    ) {
      this.setState({ preventFocusOnEditButton: true });
      if (formRef.current.checkValidity()) {
        onSubmit();
      }
    }
  };

  renderReadView = () => {
    const { editButtonLabel, readView, readViewFitContainerWidth } = this.props;
    return (
      <ReadViewWrapper>
        <EditButton
          aria-label={editButtonLabel}
          type="button"
          onClick={this.props.onEditRequested}
          ref={(ref) => {
            this.editButtonRef = ref;
          }}
        />
        <ReadViewContentWrapper
          onMouseEnter={() => this.setState({ onReadViewHover: true })}
          onMouseLeave={() => this.setState({ onReadViewHover: false })}
          onClick={this.onReadViewClick}
          onMouseDown={(e) => {
            this.startX = e.clientX;
            this.startY = e.clientY;
          }}
          readViewFitContainerWidth={readViewFitContainerWidth}
        >
          {readView()}
        </ReadViewContentWrapper>
      </ReadViewWrapper>
    );
  };

  renderActionButtons = () => {
    const { confirmButtonLabel, cancelButtonLabel } = this.props;
    return (
      <ButtonsWrapper>
        <ButtonWrapper>
          <Button
            aria-label={confirmButtonLabel}
            type="submit"
            iconBefore={<ConfirmIcon label="Confirm" size="small" />}
            shouldFitContainer
            onMouseDown={() => {
              /** Prevents focus on edit button only if mouse is used to click button */
              this.setState({ preventFocusOnEditButton: true });
            }}
          />
        </ButtonWrapper>
        <ButtonWrapper>
          <Button
            aria-label={cancelButtonLabel}
            iconBefore={<CancelIcon label="Cancel" size="small" />}
            onClick={this.onCancelClick}
            onMouseDown={() => {
              /** Prevents focus on edit button only if mouse is used to click button */
              this.setState({ preventFocusOnEditButton: true });
            }}
            shouldFitContainer
          />
        </ButtonWrapper>
      </ButtonsWrapper>
    );
  };

  render() {
    const {
      defaultValue,
      hideActionButtons,
      isEditing,
      isRequired,
      label,
      validate,
    } = this.props;
    return (
      <Form
        handleSubmit={(data: { inlineEdit: any }) =>
          this.props.onConfirm(data.inlineEdit)
        }
        onKeyDown={(e) => {
          // onKeyDown(e);
          if (e.key === 'Esc' || e.key === 'Escape') {
            this.props.onCancel();
          }
        }}
        onSubmit={console.log}
        ref={console.log}
      >
        {isEditing ? (
          <Field
            name="inlineEdit"
            label={label}
            defaultValue={defaultValue}
            validate={validate}
            isRequired={isRequired}
            /**
             * This key is required so that value is reset when edit is
             * cancelled and defaultValue is ""
             */
            key="edit-view"
          >
            {({ fieldProps, error }) => (
              <ContentWrapper
                onBlur={() =>
                  this.onWrapperBlur(fieldProps.isInvalid, onSubmit, formRef)
                }
                onFocus={this.onWrapperFocus}
              >
                {validate && (
                  <InlineDialog
                    isOpen={fieldProps.isInvalid}
                    content={<div id="error-message">{error}</div>}
                    placement="right"
                  >
                    <InlineDialogChild />
                  </InlineDialog>
                )}
                {this.props.editView(fieldProps)}
                {!hideActionButtons ? (
                  this.renderActionButtons()
                ) : (
                  /** This is to allow Ctrl + Enter to submit without action buttons */
                  <HiddenButton type="submit" />
                )}
              </ContentWrapper>
            )}
          </Field>
        ) : (
          /** Field is used here only for the label */
          <Field
            name="inlineEdit"
            label={label}
            defaultValue=""
            isRequired={isRequired}
            /**
             * This key is required so that value is reset when edit is
             * cancelled and defaultValue is ""
             */
            key="read-view"
          >
            {() => this.renderReadView()}
          </Field>
        )}
      </Form>
    );
  }
}

export default InlineEditUncontrolled;
