import Checkbox from '@uidu/checkbox';
import FieldText from '@uidu/field-text';
import Form, { FormFooter, FormMeta, FormSubmit } from '@uidu/form';
import MessagesForm from '@uidu/message-form';
import classNames from 'classnames';
import React, { PureComponent } from 'react';
import { apiCall } from 'utils';
import Header from './Header';
import MessageList from './messages';

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
      }).then((response) => fetchMessages(response, 'conversation'));
    }
  }

  handleUnregistered = (modelToSubmit) =>
    this.setState({
      needsToRegister: true,
      stalledMessage: modelToSubmit,
    });

  handleSubmit = (model) => {
    const {
      createMessage,
      fetchMessages,
      setCurrentMember,
      currentUser,
      currentOrganization,
      createConversation,
    } = this.props;
    return apiCall('post', '/dashboard/apps/contacts/contacts', model).then(
      (response) => {
        const { contact } = response.data;
        setCurrentMember(contact);
        return createConversation({
          sender_id: contact.id,
          sender_type: 'Contact',
          receiver_id: currentOrganization.id,
          receiver_type: 'Organization',
        }).then((conversation) => {
          createMessage(conversation, 'conversation', {
            message: {
              ...this.state.stalledMessage.message,
              messager_id: contact.id,
              messager_type: 'Contact',
            },
          }).then((message) => {
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
          imageUrl={agentProfile.avatar}
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
              handleSubmit={async (model) => {
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
                        onClick={(e) => {
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
              <FieldText
                type="email"
                name="contact[email]"
                label="Inserisci la tua mail"
                required
                // autoFocus
              />
              <FieldText
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
            <MessageList {...this.props} imageUrl={agentProfile.avatar} />,
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
