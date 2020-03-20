import loadable from '@loadable/component';
import FieldMentions, { defaultStyle } from '@uidu/field-mentions';
import FieldText from '@uidu/field-text';
import { Form, FormFooter, FormMeta, FormSubmit } from '@uidu/form';
import MediaFilmStrip from '@uidu/media-filmstrip';
import Spinner from '@uidu/spinner';
import classNames from 'classnames';
import Formsy from 'formsy-react';
import React, { cloneElement, Fragment } from 'react';
import { Send, Smile, ThumbsUp } from 'react-feather';
import { MessageFormProps, MessageFormState } from '../types';
import MessageFormActions from './MessageFormActions';
import MessageFormReplyTo from './MessageFormReplyTo';

const LoadableEmojiPicker = loadable(() => import('./MessageFormEmojiPicker'));

export default class MessagesForm extends React.Component<
  MessageFormProps,
  MessageFormState
> {
  private form: React.RefObject<Formsy> = React.createRef();
  private suggestionsPortal: React.RefObject<any> = React.createRef();
  private mentionsInput: React.RefObject<any> = React.createRef();
  private mentionsComponentInput: React.RefObject<any> = React.createRef();

  static defaultProps = {
    actions: [],
    attachments: [],
    placeholder: 'Add your message...',
    onSubmit: () => {},
    onDismiss: () => {},
    createMessage: console.log,
    updateMessage: console.log,
  };

  constructor(props: MessageFormProps) {
    super(props);
    this.state = {
      emojiPicker: false,
      submitted: false,
      submitLabel: props.message.body
        ? this.messageSender()
        : this.thumbSender(),
    };
  }

  focus = () => {
    this.mentionsInput.current.focus();
  };

  isValid = (canSubmit: boolean): boolean => {
    if (this.props.attachments.length > 0) {
      return (
        this.props.attachments.filter(a => !a.signed_id).length === 0 &&
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
    const { createMessage, updateMessage, message } = this.props;
    const { replyTo } = message;
    const modelToSubmit = {
      message: {
        ...model.message,
        ...(replyTo && {
          parent_id: replyTo.id,
        }),
        body: model.message.body && model.message.body.value,
        mentions: model.message.body ? model.message.body.mentions : [],
      },
    };
    if (!message.id) {
      return createMessage(modelToSubmit);
    }
    return updateMessage(message, modelToSubmit);
  };

  handleThumb = () => {
    const { createMessage } = this.props;
    return createMessage({
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
      onReplyDismiss,
      attachments,
    } = this.props;
    const { replyTo } = message;

    const { submitted, submitLabel } = this.state;

    console.log(attachments);

    return (
      <Fragment>
        {replyTo && (
          <MessageFormReplyTo
            replyTo={replyTo}
            onReplyDismiss={onReplyDismiss}
          />
        )}
        <div
          className={classNames('bg-white position-relative', {
            border: !!message.body,
            'border-top p-3': !message.body,
          })}
        >
          {attachments.length > 0 && <MediaFilmStrip files={attachments} />}
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
            ref={this.suggestionsPortal}
          />
          <Form
            ref={this.form}
            handleSubmit={async (model: any) => {
              await this.handleSubmit(model);
              this.setState(
                {
                  emojiPicker: false,
                  submitLabel: this.thumbSender(),
                  submitted: true,
                },
                () => {
                  this.form.current.reset();
                  onSubmit();
                },
              );
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
                      this.setState(prevState => ({
                        emojiPicker: !prevState.emojiPicker,
                      }))
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
              <MessageFormActions actions={actions} />
            )}
            <div className="d-flex align-items-center flex-grow-1">
              <FieldMentions
                componentRef={this.mentionsInput}
                className={classNames('border-0 shadow-none', {
                  'mr-2': !message.body,
                })}
                layout="elementOnly"
                name="message[body]"
                onChange={this.handleSubmitLabel}
                required={this.props.attachments.length === 0}
                value={message.body ? { value: message.body } : ''}
                onKeyDown={(event: React.KeyboardEvent) => {
                  if (event.keyCode === 13 && !event.shiftKey) {
                    event.preventDefault();
                    this.form.current.submit();
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
                      boxShadow: 'none',
                      borderTop: '1px solid #e7e7e7',
                      borderBottom: '1px solid #e7e7e7',
                      maxHeight: '13rem',
                      overflow: 'auto',
                    },
                  },
                }}
                suggestionsPortalHost={this.suggestionsPortal.current}
              />
              {attachments.map((attachment, index) => (
                <FieldText
                  key={attachment.signed_id}
                  type="hidden"
                  name={`message[attachments][${index}][signed_blob_id]`}
                  value={attachment.signed_id}
                />
              ))}
            </div>
          </Form>
          {this.state.emojiPicker && (
            <LoadableEmojiPicker
              fallback={
                <div className="p-3 d-flex align-items-center justify-content-center">
                  <Spinner />
                </div>
              }
              mentionsInput={this.mentionsInput}
            />
          )}
        </div>
      </Fragment>
    );
  }
}
