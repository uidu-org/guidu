import * as React from 'react';
import moment from 'moment';
import faker from 'faker';

import ChatWindow from '../src';

import {
  messagerFactory,
  messageLogFactory,
} from '@uidu/message/examples-utils';

const userA = {
  ...messagerFactory(),
  id: 1,
};
const userB = {
  ...messagerFactory(),
  id: 2,
};
const messageLog = messageLogFactory();

const past = faker.date.past();
const yesterday = faker.date.past();
const today = moment().toISOString();
const earlier = moment().subtract(5, 'minutes');
const muchEarlier = moment().subtract(30, 'minutes');

export default class Basic extends React.Component<{}> {
  state = { showLoadingState: false };

  render() {
    const { showLoadingState } = this.state;

    return (
      <ChatWindow
        messageable={{
          messages: {
            hasMore: true,
            messages: [
              {
                messager: userA,
                kind: 'message.create',
                body:
                  'Default value [John Doe](Member:johndoe) e poi altro, possibilmente con molto testo per capire come si comporta su due righe',
                createdAt: today,
                id: 1,
              },
              {
                messager: userB,
                kind: 'message.create',
                body:
                  'This contains a URL, https://github.com/milesj/interweave, and a hashtag, #interweave, that will be converted to an anchor link!',
                createdAt: earlier,
                id: 2,
              },
              {
                messager: userB,
                kind: 'message.create',
                body: faker.lorem.paragraph(),
                createdAt: muchEarlier,
                id: 3,
              },
              {
                messager: userA,
                kind: 'message.create',
                body: faker.lorem.paragraphs(),
                createdAt: yesterday,
                id: 4,
                reactions: [`😀`, `😀`, `❤️`],
              },
              {
                messager: userA,
                kind: 'message.create',
                body: faker.lorem.paragraphs(),
                createdAt: yesterday,
                id: 5,
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
              {
                messager: userA,
                kind: 'message.log',
                body: faker.lorem.sentence(),
                createdAt: past,
                id: 6,
              },
            ],
          },
        }}
      />
    );
  }
}
