import faker from '@faker-js/faker';
import React from 'react';
import { messageLogFactory, messagerFactory } from '../examples-utils';
import Message, { MessageGroup } from '../src';

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
      messages.map((message) => (
        <Message key={message.id} message={message} messager={messager} />
      ))
    }
  </MessageGroup>
);
