// @flow
import React from 'react';
import faker from 'faker';

import Message, { MessageGroup, MessageLog, MessageReactions } from '../src';

import { messagerFactory, messageLogFactory } from '../examples-utils';

const userA = messagerFactory();
const userB = messagerFactory();
const messageLog = messageLogFactory();

export default () => (
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
        <Message key={message.id} message={message} messager={messager} />
      ))
    }
  </MessageGroup>
);
