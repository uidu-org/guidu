import { Message } from '@uidu/message';
import faker from 'faker';
import moment from 'moment';

export const message: () => Message = () => ({
  klass: 'Message',
  scope: 'messages',
  kind: 'message.create',
  id: faker.random.uuid(),
  uid: faker.random.uuid(),
  body: faker.random.boolean() ? faker.lorem.paragraph() : faker.lorem.words(),
  createdAt: moment().toDate(),
  updatedAt: faker.date.recent(),
  messager: {
    name: faker.name.findName(),
    id: faker.random.boolean() ? '1306' : '1206',
    avatar: {
      thumb: faker.image.avatar(),
    },
  },
  ...(faker.random.boolean()
    ? {
        attachments: [
          {
            id: faker.random.uuid(),
            src: faker.random.image(),
            type: 'image',
            filename: faker.random.words(),
          },
          {
            id: faker.random.uuid(),
            src: faker.random.image(),
            type: 'image',
            filename: faker.random.words(),
          },
        ],
      }
    : {}),
});

export const fetchMessages = (limit = 20, page, previuosMessage) => {
  console.log(page);
  return new Promise((resolve, reject) => {
    let wait = setTimeout(() => {
      clearTimeout(wait);
      resolve(
        Array.from(Array(limit).keys()).map(index => {
          return {
            ...message(),
            createdAt: moment()
              .subtract(page * limit + index, 'hours')
              .toISOString(),
          };
        }),
      );
    }, 3000);
  });
};
