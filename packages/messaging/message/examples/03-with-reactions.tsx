import React, { Component } from 'react';
import { messageFactory, messagerFactory } from '../examples-utils';
import Message, {
  MessageActionReactions,
  MessageActions,
  MessageGroup,
} from '../src';

const message1 = messageFactory();
const message2 = messageFactory();
const messager = messagerFactory();

export default class Demo extends Component {
  static defaultProps = {
    reactions: {},
  };

  state = {
    reactions: { 0: [`❤️`, `❤️`, `😀`] },
  };

  addReaction = (reaction, index) => {
    this.setState((prevState) => ({
      reactions: {
        ...prevState.reactions,
        [index]: [...(prevState.reactions[index] || []), reaction],
      },
    }));
  };

  render() {
    const { reactions } = this.state;
    return (
      <MessageGroup messager={messager} messages={[message1, message2]}>
        {({ messages, messager }) =>
          messages.map((message, index) => (
            <Message message={message} messager={messager}>
              {({ editing, hovered, onDropdownChange }) => (
                <MessageActions hovered={hovered}>
                  <MessageActionReactions
                    onOpenChange={onDropdownChange}
                    onClick={(reaction) => this.addReaction(reaction, index)}
                  />
                </MessageActions>
              )}
            </Message>
          ))
        }
      </MessageGroup>
    );
  }
}
