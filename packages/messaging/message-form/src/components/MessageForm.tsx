import React, { cloneElement } from 'react';
import classNames from 'classnames';
import {
  Plus,
  Smile,
  BarChart2,
  Paperclip,
  ThumbsUp,
  Send,
  Clock,
  Mic,
} from 'react-feather';
import { Picker } from 'emoji-mart';
import { Form, FormFooter, FormMeta, FormSubmit } from '@uidu/form';
import FieldMentions, { defaultStyle } from '@uidu/field-mentions';
import Dropdown, { DropdownItem, DropdownItemGroup } from '@uidu/dropdown-menu';
import 'emoji-mart/css/emoji-mart.css';

import { MessageFormProps, MessageFormState } from '../types';

let container: any;

export default class MessagesForm extends React.Component<
  MessageFormProps,
  MessageFormState
> {
  private form: React.RefObject<any> = React.createRef();
  private mentionsInput: React.RefObject<any> = React.createRef();
  private mentionsComponentInput: React.RefObject<any> = React.createRef();

  static defaultProps = {
    actions: [],
    placeholder: 'Add your message...',
    onSubmit: () => {},
    onDismiss: () => {},
    createMessage: console.log,
    updateMessage: console.log,
  };

  constructor(props: MessageFormProps) {
    super(props);
    this.state = {
      attachments: [],
      emojiPicker: false,
      submitted: false,
      submitLabel: props.message.body
        ? this.messageSender()
        : this.thumbSender(),
    };
  }

  isValid = (canSubmit: boolean): boolean => {
    if (this.state.attachments.length > 0) {
      return (
        this.state.attachments.filter(a => !a.signed_id).length === 0 &&
        canSubmit
      );
    }
    return canSubmit;
  };

  handleSubmitLabel = (_name: string, value: string | Object): void => {
    if (value !== '') {
      this.setState({
        submitLabel: this.messageSender(),
      });
    } else {
      this.setState({
        submitLabel: this.props.message.body
          ? this.messageSender()
          : this.thumbSender(),
      });
    }
  };

  handleSubmit = (model: any): Promise<any> => {
    const { createMessage, updateMessage, messageable, message } = this.props;
    const modelToSubmit = {
      message: {
        ...model.message,
        body: model.message.body && model.message.body.value,
        mentions: model.message.body ? model.message.body.mentions : [],
      },
    };
    if (!message.id) {
      return createMessage(messageable, modelToSubmit);
    }
    return updateMessage(messageable, message, modelToSubmit);
  };

  handleThumb = () => {
    const { createMessage, messageable } = this.props;
    return createMessage(messageable, {
      message: {
        body: '👍',
      },
    });
  };

  messageSender = () => (
    <FormSubmit
      className="btn-sm btn-teams ml-2 d-flex align-items-center"
      label={<Send className="d-flex" size={18} />}
    />
  );

  thumbSender = () => (
    <button
      className="btn-sm btn-teams ml-2 d-flex align-items-center"
      type="button"
      onClick={this.handleThumb}
    >
      <ThumbsUp size={18} />
    </button>
  );

  render() {
    const {
      actions,
      message,
      placeholder,
      mentionables,
      onDismiss,
      onSubmit,
    } = this.props;

    const { submitted, submitLabel } = this.state;

    return (
      <div
        className={classNames('bg-white p-3 sticky-bottom position-relative', {
          border: !!message.body,
          'border-top': !message.body,
        })}
      >
        <div
          id="suggestionPortal"
          style={{
            maxHeight: '400px',
            position: 'absolute',
            width: '100%',
            left: 0,
            bottom: '100%',
            zIndex: 3000,
          }}
          ref={el => {
            container = el;
          }}
        />
        <Form
          ref={this.form}
          submitted={submitted}
          handleSubmit={async (model: any) => {
            await this.handleSubmit(model);
            this.setState({
              attachments: [],
              emojiPicker: false,
              submitLabel: this.thumbSender(),
              submitted: true,
            });
            this.form.current.form.reset();
            onSubmit();
          }}
          className={classNames('', {
            'd-flex': !message.body,
          })}
          inputsWrapperProps={{
            className: 'd-flex flex-grow-1',
          }}
          footerRenderer={({
            loading,
            canSubmit,
          }: {
            loading: boolean;
            canSubmit: boolean;
          }) => {
            if (message.body) {
              return (
                <div className="px-2 pb-3">
                  <FormFooter>
                    <FormMeta className="d-flex">
                      {cloneElement(this.messageSender(), {
                        loading,
                        canSubmit: this.isValid(canSubmit),
                        label: 'Salva',
                      })}
                      <button
                        type="button"
                        className="btn btn-sm"
                        onClick={e => {
                          e.preventDefault();
                          onDismiss();
                        }}
                      >
                        Annulla
                      </button>
                    </FormMeta>
                  </FormFooter>
                </div>
              );
            }
            return (
              <div className="d-flex align-items-center align-self-center">
                <button
                  className="btn btn-sm d-none d-md-flex align-items-center mb-0 text-muted px-2 shadow-none"
                  type="button"
                  onClick={() =>
                    this.setState({
                      emojiPicker: !this.state.emojiPicker,
                    })
                  }
                >
                  <Smile size={18} />
                </button>
                {submitLabel &&
                  cloneElement(submitLabel, {
                    loading,
                    canSubmit: this.isValid(canSubmit),
                  })}
              </div>
            );
          }}
        >
          {!message.body && actions.length > 0 && (
            <Dropdown
              className="align-self-center"
              trigger={
                <button
                  className="btn btn-sm d-none d-md-flex align-items-center mb-0 text-muted px-2 shadow-none"
                  type="button"
                >
                  <Plus size={18} />
                </button>
              }
            >
              {actions.map(actionGroup => (
                <DropdownItemGroup
                  key={actionGroup.name}
                  title={actionGroup.name}
                >
                  {actionGroup.children.map((action, index) => (
                    <DropdownItem key={index} {...action.props}>
                      {action.name}
                    </DropdownItem>
                  ))}
                </DropdownItemGroup>
              ))}
            </Dropdown>
          )}
          <div className="d-flex align-items-center flex-grow-1">
            <FieldMentions
              ref={this.mentionsInput}
              componentRef={this.mentionsComponentInput}
              className="border-0 mr-2"
              layout="elementOnly"
              name="message[body]"
              onChange={this.handleSubmitLabel}
              required={this.state.attachments.length === 0}
              value={message.body ? { value: message.body } : ''}
              onKeyDown={(event: KeyboardEvent) => {
                if (event.keyCode === 13 && !event.shiftKey) {
                  event.preventDefault();
                  this.form.current.form.submit();
                }
              }}
              placeholder={placeholder}
              autoFocus={!!message.body}
              items={mentionables}
              style={{
                ...defaultStyle,
                suggestions: {
                  ...defaultStyle.suggestions,
                  marginTop: 0,
                  position: 'relative',
                  top: 0,
                  left: 0,
                  list: {
                    ...defaultStyle.suggestions.list,
                    maxHeight: '13rem',
                    overflow: 'auto',
                  },
                },
              }}
              suggestionsPortalHost={container}
            />
            {/* {attachments.map((attachment, index) => (
              <Input
                key={attachment.signed_id}
                type="hidden"
                name={`message[attachments][${index}][signed_blob_id]`}
                value={attachment.signed_id}
              />
            ))} */}
          </div>
        </Form>
        {this.state.emojiPicker && (
          <Picker
            onSelect={(emoji: any) => {
              const previousValue = this.mentionsInput.current.state.value;
              const newValue = `${
                previousValue ? `${previousValue.value} ` : ''
              }${emoji.native}`;
              this.mentionsInput.current.setValue({
                ...previousValue,
                value: newValue,
                plainTextValue: newValue,
              });
              this.mentionsComponentInput.current.handleChange(
                null,
                newValue,
                newValue,
                previousValue ? previousValue.mentions : [],
              );
            }}
            showPreview
            style={{
              width: '100%',
              fontFamily: 'inherit',
              fontSize: 'inherit',
              color: 'inherit',
              borderRadius: 0,
            }}
          />
        )}
      </div>
    );
  }
}
