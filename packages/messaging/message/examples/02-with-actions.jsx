// @flow
import React, { Component } from 'react';

import Message, {
  MessageGroup,
  MessageActions,
  MessageActionReactions,
  MessageActionReply,
  MessageActionPin,
  MessageActionMore,
  MessageReactions,
} from '../src';

import { messageFactory, messagerFactory } from '../examples-utils';

const generatedMessage = messageFactory();
const messager = messagerFactory();

export default class Demo extends Component {
  static defaultProps = {
    reactions: {},
  };

  state = {
    reactions: { 0: [`❤️`, `❤️`, `😀`] },
  };

  addReaction = (reaction, index) => {
    this.setState(prevState => ({
      reactions: {
        ...prevState.reactions,
        [index]: [...(prevState.reactions[index] || []), reaction],
      },
    }));
  };

  render() {
    const { reactions } = this.state;
    return (
      <MessageGroup messages={[generatedMessage]} messager={messager}>
        {({ messages, messager }) =>
          messages.map((message, index) => (
            <Message key={message.id} message={message} messager={messager}>
              {({ editing, hovered, onDropdownChange }) => [
                <MessageActions hovered={hovered}>
                  <MessageActionReactions
                    onOpenChange={onDropdownChange}
                    onClick={reaction => this.addReaction(reaction, index)}
                  />
                  <MessageActionReply />
                  <MessageActionPin />
                  <MessageActionMore
                    onOpenChange={onDropdownChange}
                    actions={[{ name: 'Edit' }, { name: 'Forward' }]}
                  />
                </MessageActions>,
                <MessageReactions reactions={reactions[index]} />,
              ]}
            </Message>
          ))
        }
      </MessageGroup>
    );
  }
}
