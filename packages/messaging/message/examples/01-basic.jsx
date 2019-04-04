// @flow
import React from 'react';
import faker from 'faker';

import Message, { MessageGroup, MessageLog, MessageReactions } from '../src';

import { messagerFactory, messageLogFactory } from '../examples-utils';

const userA = messagerFactory();
const userB = messagerFactory();
const messageLog = messageLogFactory();

export default () => (
  <div>
    <MessageGroup
      messager={userA}
      messages={[
        {
          body: faker.lorem.paragraphs(),
          createdAt: faker.date.past(),
        },
        {
          body: faker.lorem.paragraph(),
          createdAt: faker.date.past(),
        },
      ]}
    >
      {({ messages, messager }) =>
        messages.map(message => (
          <Message key={message.id} message={message} messager={messager} />
        ))
      }
    </MessageGroup>
    <MessageGroup
      messager={userB}
      messages={[
        {
          body:
            'Default value [John Doe](Member:johndoe) e poi altro, possibilmente con molto testo per capire come si comporta su due righe',
          createdAt: faker.date.past(),
        },
      ]}
    >
      {({ messages, messager }) =>
        messages.map(message => (
          <Message key={message.id} message={message} messager={messager} />
        ))
      }
    </MessageGroup>
    <MessageLog message={messageLog} messager={messageLog.messager} />
    <MessageGroup
      messager={userA}
      messages={[
        {
          body: faker.lorem.paragraph(),
          createdAt: faker.date.past(),
          attachments: [
            {
              mediaItemType: 'file',
              id: '9016',
              collectionName: 'uidu',
            },
            {
              mediaItemType: 'file',
              id: '9017',
              collectionName: 'uidu',
            },
            {
              mediaItemType: 'file',
              id: '9018',
              collectionName: 'uidu',
            },
            {
              mediaItemType: 'file',
              id: '9015',
              collectionName: 'uidu',
            },
          ],
        },
      ]}
    >
      {({ messages, messager }) =>
        messages.map(message => (
          <Message key={message.id} message={message} messager={messager}>
            {({ editing, hovered }) => [
              <MessageReactions reactions={[`😀`, `😀`, `❤️`]} />,
            ]}
          </Message>
        ))
      }
    </MessageGroup>
  </div>
);
