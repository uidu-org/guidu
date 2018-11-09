import React, { Component, cloneElement } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { UserCheck, Paperclip, ThumbsUp, Send } from 'react-feather';
import { Picker } from 'emoji-mart';
import { Form, FormFooter, FormMeta, FormSubmit } from '@uidu/forms';
import { Input, Checkbox, Mentions as MentionsInput } from '@uidu/inputs';

import { DirectUpload } from 'activestorage';

import * as loadImage from 'blueimp-load-image';

import 'emoji-mart/css/emoji-mart.css';

import AttachmentsNew from './attachments/new';
import Attachment from './attachments/show';

export default class MessagesForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      attachments: [],
      emojiPicker: false,
      submitted: false,
      submitLabel: props.message.body
        ? this.messageSender()
        : this.thumbSender(),

      needsToRegister: false,
      stalledMessage: {},
    };
  }

  onAdd = files => {
    Array.from(files).forEach((file, index) => {
      this.add(file, index + this.state.attachments.length);
      this.preview(file, index + this.state.attachments.length);
      this.upload(file, index + this.state.attachments.length);
    });
  };

  add = (file, index) => {
    this.setState({
      attachments: [...this.state.attachments, { position: index }],
      submitLabel: this.messageSender(),
    });
  };

  preview = (file, index) => {
    loadImage.parseMetaData(file, data => {
      let orientation = 0;
      if (data.exif) {
        orientation = data.exif.get('Orientation');
      }
      loadImage(
        file,
        () => {
          const reader = new window.FileReader();
          if (file.type.split('/')[0] === 'image') {
            reader.readAsDataURL(file);
            reader.onloadend = () => {
              const base64data = reader.result;
              this.setState({
                attachments: [
                  ...this.state.attachments.slice(0, index),
                  {
                    ...this.state.attachments[index],
                    filename: file.name,
                    type: file.type.split('/')[1],
                    previewUrl: base64data,
                  },
                  ...this.state.attachments.slice(index + 1),
                ],
              });
            };
          } else {
            this.setState({
              attachments: [
                ...this.state.attachments.slice(0, index),
                {
                  ...this.state.attachments[index],
                  filename: file.name,
                  type: file.type.split('/')[1],
                  // previewUrl: base64data,
                },
                ...this.state.attachments.slice(index + 1),
              ],
            });
          }
        },
        {
          orientation,
          canvas: true,
        },
      );
    });
  };

  upload = (file, index) => {
    const upload = new DirectUpload(
      file,
      '/rails/active_storage/direct_uploads',
    );

    upload.create((error, blob) => {
      if (error) {
        // Handle the error
      } else {
        this.setState({
          attachments: [
            ...this.state.attachments.slice(0, index),
            {
              ...this.state.attachments[index],
              ...blob,
            },
            ...this.state.attachments.slice(index + 1),
          ],
        });
      }
    });
  };

  remove = index => {
    this.setState(
      {
        attachments: this.state.attachments.filter((a, i) => index !== i),
      },
      () => {
        if (this.state.attachments.length === 0) {
          this.setState({
            submitLabel: this.thumbSender(),
          });
        }
      },
    );
  };

  isValid = canSubmit => {
    if (this.state.attachments.length > 0) {
      return (
        this.state.attachments.filter(a => !a.signed_id).length === 0 &&
        canSubmit
      );
    }
    return canSubmit;
  };

  handleSubmitLabel = (name, value) => {
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

  handleSubmit = model => {
    const {
      createMessage,
      updateMessage,
      messageable,
      message,
      kind,
      currentMember,
      handleUnregistered,
    } = this.props;
    const modelToSubmit = {
      message: {
        ...model.message,
        body: model.message.body && model.message.body.value,
        mentions: model.message.body ? model.message.body.mentions : [],
      },
    };
    if (!currentMember) {
      return handleUnregistered(modelToSubmit);
    }
    if (!message.id) {
      return createMessage(messageable, kind, modelToSubmit);
    }
    return updateMessage(messageable, kind, message, modelToSubmit);
  };

  handleThumb = () => {
    const { createMessage, messageable, kind } = this.props;
    return createMessage(messageable, kind, {
      message: {
        body: '👍',
      },
    });
  };

  messageSender = () => (
    <FormSubmit
      className="btn-sm btn-groups mx-2 mr-3 d-flex align-items-center"
      label={<Send className="d-flex" size={18} />}
    />
  );

  thumbSender = () => (
    <button
      className="btn-sm btn-groups mx-2 mr-3 d-flex align-items-center"
      type="button"
      onClick={this.handleThumb}
    >
      <ThumbsUp size={18} />
    </button>
  );

  render() {
    const {
      message,
      messageable,
      currentMember,
      currentOrganization,
      // callbacks
      onDismiss,
      onSubmit,
    } = this.props;

    const { attachments, submitted, emojiPicker, submitLabel } = this.state;

    return (
      <div
        className={classNames('bg-white', {
          border: !!message.body,
          'border-top': !message.body,
        })}
      >
        {attachments.length > 0 && (
          <div className="p-2 px-md-3 bg-light animated slideInBottom">
            <div className="d-flex" style={{ overflowX: 'auto' }}>
              {attachments.map((attachment, index) => (
                <Attachment
                  attachment={attachment}
                  index={index}
                  preview
                  onRemove={this.remove}
                />
              ))}
            </div>
          </div>
        )}
        {emojiPicker && (
          <Picker
            onSelect={emoji => {
              const previousValue = this.mentionsInput.state.value;
              const newValue = `${
                previousValue ? `${previousValue.value} ` : ''
              }${emoji.native}`;
              this.mentionsInput.setValue({
                ...previousValue,
                value: newValue,
                plainTextValue: newValue,
              });
              this.mentionsComponentInput.handleChange(
                null,
                newValue,
                newValue,
                previousValue ? previousValue.mentions : [],
              );
            }}
            showPreview={false}
            style={{
              width: '100%',
              border: 0,
              // position: 'relative',
              // bottom: '64px',
              fontFamily: 'inherit',
              fontSize: 'inherit',
              color: 'inherit',
              borderRadius: 0,
            }}
          />
        )}
        <Form
          ref={c => {
            this.form = c;
          }}
          submitted={submitted}
          handleSubmit={async model => {
            await this.handleSubmit(model);
            if (currentMember) {
              this.setState({
                attachments: [],
                emojiPicker: false,
                submitLabel: this.thumbSender(),
                submitted: true,
              });
              this.form.form.reset();
              onSubmit();
            }
          }}
          className={classNames('', { 'd-flex': !message.body })}
          inputsWrapperProps={{ className: 'flex-grow-1' }}
          footerRenderer={({ loading, canSubmit }) => {
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
              <div className="d-flex align-items-center align-self-end">
                <button
                  className="btn d-none d-md-flex align-items-center mb-0 text-muted"
                  type="button"
                  onClick={() =>
                    this.setState({
                      emojiPicker: !emojiPicker,
                    })
                  }
                >
                  <UserCheck size={18} />
                </button>
                <AttachmentsNew
                  className="btn d-flex align-items-center mb-0 text-muted"
                  type="button"
                  name="attachment[file]"
                  attachable={message}
                  attachments={attachments}
                  onAdd={this.onAdd}
                  multiple
                >
                  <Paperclip size={18} />
                </AttachmentsNew>
                {cloneElement(submitLabel, {
                  loading,
                  canSubmit: this.isValid(canSubmit),
                })}
              </div>
            );
          }}
        >
          <div className="d-flex align-items-center">
            <MentionsInput
              ref={c => {
                this.mentionsInput = c;
              }}
              componentRef={c => {
                this.mentionsComponentInput = c;
              }}
              name="message[body]"
              value={message.body ? { value: message.body } : ''}
              className="mentions mr-2"
              layout="elementOnly"
              onChange={this.handleSubmitLabel}
              items={[]}
              onKeyDown={event => {
                if (event.keyCode === 13 && !event.shiftKey) {
                  event.preventDefault();
                  this.form.form.submit();
                }
              }}
              placeholder={`Scrivi a ${currentOrganization.name}`}
              displayTransform={(id, display) => display}
              required={attachments.length === 0}
              autoFocus={!!message.body}
            />
            {attachments.map((attachment, index) => (
              <Input
                key={attachment.signed_id}
                type="hidden"
                name={`message[attachments][${index}][signed_blob_id]`}
                value={attachment.signed_id}
              />
            ))}
          </div>
        </Form>
      </div>
    );
  }
}

MessagesForm.propTypes = {
  createMessage: PropTypes.func.isRequired,
  updateMessage: PropTypes.func.isRequired,
  onSubmit: PropTypes.func,
  onDismiss: PropTypes.func,
  messageable: PropTypes.shape(PropTypes.obj).isRequired,
  message: PropTypes.shape(PropTypes.obj).isRequired,
  kind: PropTypes.string.isRequired,
};

MessagesForm.defaultProps = {
  onSubmit: () => {},
  onDismiss: () => {},
};
