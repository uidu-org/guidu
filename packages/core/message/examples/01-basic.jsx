// @flow
import React from 'react';
import faker from 'faker';

import Message from '../src';

const message = {
  messager: {
    ...faker.helpers.userCard(),
    avatar: {
      thumb: `https://api.adorable.io/avatars/80/${faker.internet.email()}.png`,
    },
  },
  body: faker.lorem.paragraphs(),
  createdAt: faker.date.past(),
};

export default () => <Message message={message} />;
