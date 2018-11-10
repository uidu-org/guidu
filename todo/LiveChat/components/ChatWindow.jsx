import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Send } from 'react-feather';
import { Form, FormFooter, FormMeta, FormSubmit } from '@uidu/forms';
import { Input, Checkbox } from '@uidu/inputs';
import { apiCall } from 'utils';
import MessagesForm from './messages/form';
import MessageList from './messages';
import Header from './Header';

export default class ChatWindow extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      needsToRegister: false,
      stalledMessage: {},
      message: props.message || {},
    };
  }

  componentDidMount() {
    const {
      conversation,
      fetchMessages,
      currentMember,
      currentOrganization,
      createConversation,
    } = this.props;
    if (conversation.id) {
      console.log('we have conversation');
      return fetchMessages(conversation, 'conversation');
    }
    if (currentMember) {
      console.log('we have currentMember');
      return createConversation({
        sender_id: currentMember.id,
        sender_type: 'Contact',
        receiver_id: currentOrganization.id,
        receiver_type: 'Organization',
      }).then(response => fetchMessages(response, 'conversation'));
    }
  }

  handleUnregistered = modelToSubmit =>
    this.setState({
      needsToRegister: true,
      stalledMessage: modelToSubmit,
    });

  handleSubmit = model => {
    const {
      createMessage,
      fetchMessages,
      setCurrentMember,
      currentUser,
      currentOrganization,
      createConversation,
    } = this.props;
    return apiCall('post', '/dashboard/apps/contacts/contacts', model).then(
      response => {
        const { contact } = response.data;
        setCurrentMember(contact);
        return createConversation({
          sender_id: contact.id,
          sender_type: 'Contact',
          receiver_id: currentOrganization.id,
          receiver_type: 'Organization',
        }).then(conversation => {
          createMessage(conversation, 'conversation', {
            message: {
              ...this.state.stalledMessage.message,
              messager_id: contact.id,
              messager_type: 'Contact',
            },
          }).then(message => {
            if (currentUser) {
              fetchMessages(conversation, 'conversation', message.id);
            }
          });
        });
      },
    );
  };

  render() {
    const {
      conversation,
      messages,
      messageForm,
      isOpen,
      agentProfile,
      colors,
      onClose,
    } = this.props;

    const { needsToRegister, stalledMessage, message } = this.state;

    return (
      <div
        className={classNames('sc-chat-window', {
          opened: isOpen,
          closed: !isOpen,
        })}
      >
        <Header
          teamName={agentProfile.name}
          imageUrl={agentProfile.avatar.thumb}
          onClose={onClose}
          colors={colors}
        />
        {needsToRegister ? (
          <div className="bg-white border-top h-100 animated slideInUp p-3">
            <p className="mb-0">Registrati per mandare questo messaggio</p>
            <div className="p-3 rounded bg-light my-3">
              {stalledMessage.message.body}
            </div>
            <Form
              submitted={false}
              handleSubmit={async model => {
                this.handleSubmit(model).then(() =>
                  this.setState({
                    needsToRegister: false,
                    // message: {},
                    // stalledMessage: {},
                  }),
                );
              }}
              footerRenderer={({ loading, canSubmit }) => (
                <div className="my-3">
                  <FormFooter>
                    <FormMeta className="d-flex w-100">
                      <FormSubmit
                        className="btn-groups col-sm-6"
                        canSubmit={canSubmit}
                        loading={loading}
                        label="Invia"
                      />
                      <button
                        type="button"
                        className="btn col-sm-6"
                        onClick={e => {
                          e.preventDefault();
                          this.setState({
                            needsToRegister: false,
                            message: stalledMessage.body,
                          });
                        }}
                      >
                        Annulla
                      </button>
                    </FormMeta>
                  </FormFooter>
                </div>
              )}
            >
              <Input
                type="email"
                name="contact[email]"
                label="Inserisci la tua mail"
                required
                // autoFocus
              />
              <Input
                name="contact[display_name]"
                label="Il tuo nome"
                required
                // autoFocus
              />
              <Checkbox
                name="privacy"
                layout="elementOnly"
                label="Acconsento al trattamento dei dati personali"
                required
              />
            </Form>
          </div>
        ) : (
          [
            <MessageList {...this.props} imageUrl={agentProfile.avatar.url} />,
            <MessagesForm
              {...this.props}
              handleUnregistered={this.handleUnregistered}
              messageable={conversation}
              message={message}
              kind="conversation"
            />,
          ]
        )}
      </div>
    );
  }
}

ChatWindow.propTypes = {};
