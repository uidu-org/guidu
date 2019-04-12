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
// import { Input, Mentions as MentionsInput } from '@uidu/inputs';
// import * as loadImage from 'blueimp-load-image';
// import {
//   mentionableMembers,
//   mentionableTeams,
//   mentionableContacts,
// } from 'apps/teams/utils';

// import { DirectUpload } from 'activestorage';

import 'emoji-mart/css/emoji-mart.css';

// import AttachmentsNew from './attachments/new';
// import Attachment from './attachments/show';

import { MessageFormProps, MessageFormState } from '../types';

interface GitHubJSONResponse {
  items: Array<any>;
}

function fetchUsers(query: string, callback: () => void): any {
  if (!query) {
    return Promise.resolve([]);
  }

  return (
    fetch(`https://api.github.com/search/users?q=${query}`)
      .then((response: Response) => response.json())
      // Transform the users to what react-mentions expects
      .then((json: GitHubJSONResponse) =>
        json.items.map(user => ({ display: user.login, id: user.login })),
      )
      .then(callback)
      .catch(() => [])
  );
}

let container: any;

export default class MessagesForm extends React.Component<
  MessageFormProps,
  MessageFormState
> {
  private form: React.RefObject<any> = React.createRef();
  private mentionsInput: React.RefObject<any> = React.createRef();
  private mentionsComponentInput: React.RefObject<any> = React.createRef();

  static defaultProps = {
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

  // onAdd = files => {
  //   Array.from(files).forEach((file, index) => {
  //     this.add(file, index + this.state.attachments.length);
  //     this.preview(file, index + this.state.attachments.length);
  //     this.upload(file, index + this.state.attachments.length);
  //   });
  // };

  // add = (file, index) => {
  //   this.setState({
  //     attachments: [...this.state.attachments, { position: index }],
  //     submitLabel: this.messageSender(),
  //   });
  // };

  // preview = (file, index) => {
  //   loadImage.parseMetaData(file, data => {
  //     let orientation = 0;
  //     if (data.exif) {
  //       orientation = data.exif.get('Orientation');
  //     }
  //     loadImage(
  //       file,
  //       () => {
  //         const reader = new window.FileReader();
  //         if (file.type.split('/')[0] === 'image') {
  //           reader.readAsDataURL(file);
  //           reader.onloadend = () => {
  //             const base64data = reader.result;
  //             this.setState({
  //               attachments: [
  //                 ...this.state.attachments.slice(0, index),
  //                 {
  //                   ...this.state.attachments[index],
  //                   filename: file.name,
  //                   type: file.type.split('/')[1],
  //                   previewUrl: base64data,
  //                 },
  //                 ...this.state.attachments.slice(index + 1),
  //               ],
  //             });
  //           };
  //         } else {
  //           this.setState({
  //             attachments: [
  //               ...this.state.attachments.slice(0, index),
  //               {
  //                 ...this.state.attachments[index],
  //                 filename: file.name,
  //                 type: file.type.split('/')[1],
  //                 // previewUrl: base64data,
  //               },
  //               ...this.state.attachments.slice(index + 1),
  //             ],
  //           });
  //         }
  //       },
  //       {
  //         orientation,
  //         canvas: true,
  //       },
  //     );
  //   });
  // };

  // upload = (file, index) => {
  //   const upload = new DirectUpload(
  //     file,
  //     '/rails/active_storage/direct_uploads',
  //   );

  //   upload.create((error, blob) => {
  //     if (error) {
  //       // Handle the error
  //     } else {
  //       this.setState({
  //         attachments: [
  //           ...this.state.attachments.slice(0, index),
  //           {
  //             ...this.state.attachments[index],
  //             ...blob,
  //           },
  //           ...this.state.attachments.slice(index + 1),
  //         ],
  //       });
  //     }
  //   });
  // };

  // remove = index => {
  //   this.setState(
  //     {
  //       attachments: this.state.attachments.filter((a, i) => index !== i),
  //     },
  //     () => {
  //       if (this.state.attachments.length === 0) {
  //         this.setState({
  //           submitLabel: this.thumbSender(),
  //         });
  //       }
  //     },
  //   );
  // };

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
      // tasks,
      // teams,
      message,
      placeholder,
      // organizationMembers,
      // callbacks
      onDismiss,
      onSubmit,
    } = this.props;

    const { submitted } = this.state;

    return (
      <div
        className={classNames('bg-white p-3 sticky-bottom position-relative', {
          border: !!message.body,
          'border-top': !message.body,
        })}
      >
        {/* {attachments.length > 0 && (
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
        )} */}
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
            console.log(this.form);
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
                {/* <AttachmentsNew
                  className="btn btn-sm d-flex align-items-center mb-0 text-muted px-2 shadow-none mr-2"
                  type="button"
                  name="attachment[file]"
                  attachable={this.props.message}
                  attachments={this.state.attachments}
                  onAdd={this.onAdd}
                  multiple
                >
                  <Paperclip size={18} />
                </AttachmentsNew> */}
                {cloneElement(this.state.submitLabel, {
                  loading,
                  canSubmit: this.isValid(canSubmit),
                })}
              </div>
            );
          }}
        >
          {!message.body && (
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
              <DropdownItemGroup title="New...">
                <DropdownItem>
                  <Mic size="1rem" className="mr-2" />
                  Audio message
                </DropdownItem>
                <DropdownItem>
                  <BarChart2 size="1rem" className="mr-2" />
                  Poll
                </DropdownItem>
                <DropdownItem>
                  <Clock size="1rem" className="mr-2" />
                  Reminder
                </DropdownItem>
              </DropdownItemGroup>
              <DropdownItemGroup title="Add a file from...">
                <DropdownItem>
                  <Paperclip size="1rem" className="mr-2" />
                  Your computer
                </DropdownItem>
                <DropdownItem>
                  <BarChart2 size="1rem" className="mr-2" />
                  Google Drive
                </DropdownItem>
              </DropdownItemGroup>
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
              items={[
                {
                  trigger: '@',
                  type: 'User',
                  data: fetchUsers,
                },
              ]}
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
                    // display: 'flex',
                    // flexDirection: 'column-reverse',
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
              // position: 'relative',
              // bottom: '64px',
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
