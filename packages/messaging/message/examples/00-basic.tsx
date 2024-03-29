import { faker } from '@faker-js/faker';
import { ScrollableContainer, ShellMain } from '@uidu/shell';
import React from 'react';
import { messageLogFactory, messagerFactory } from '../examples-utils';
import Message, { MessageGroup, MessageLog } from '../src';

const userA = messagerFactory();
const userB = messagerFactory();
const messageLog = messageLogFactory();

export default () => (
  <ShellMain>
    <ScrollableContainer>
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
          messages.map((message) => (
            <Message key={message.id} message={message} messager={messager} />
          ))
        }
      </MessageGroup>
      <MessageGroup
        messager={userB}
        messages={[
          {
            body: 'Default value [John Doe](Member:johndoe) e poi altro, possibilmente con molto testo per capire come si comporta su due righe',
            createdAt: faker.date.past(),
          },
        ]}
      >
        {({ messages, messager }) =>
          messages.map((message) => (
            <Message key={message.id} message={message} messager={messager} />
          ))
        }
      </MessageGroup>
      <MessageGroup
        messager={userB}
        messages={[
          {
            body: '❤️',
            createdAt: faker.date.past(),
          },
        ]}
      >
        {({ messages, messager }) =>
          messages.map((message) => (
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
            reactions: [`😀`, `😀`, `❤️`],
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
    </ScrollableContainer>
  </ShellMain>
);
