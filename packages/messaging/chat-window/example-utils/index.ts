import { Message } from '@uidu/message';
import faker from 'faker';
import moment from 'moment';

const fakeAttachments = () => {
  return Array.from(Array(faker.random.number({ min: 1, max: 4 })).keys()).map(
    (i) => ({
      id: faker.random.uuid(),
      src: faker.random.image(),
      kind: faker.random.arrayElement(['file', 'image']),
      filename: faker.random.words(),
      extension: faker.random.arrayElement([
        'jpg',
        'pdf',
        'docx',
        'xlsx',
        'sql',
      ]),
    }),
  );
};

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
    avatar: faker.image.avatar(),
  },
  ...(faker.random.boolean()
    ? {
        attachments: fakeAttachments(),
      }
    : {}),
});

export const fetchMessages = (limit = 40, page, previuosMessage) => {
  return new Promise((resolve, reject) => {
    let wait = setTimeout(() => {
      clearTimeout(wait);
      resolve(
        Array.from(Array(limit).keys()).map((index) => {
          return {
            ...message(),
            createdAt: moment()
              .subtract(page * limit + index, 'hours')
              .toISOString(),
          };
        }),
      );
    }, 300);
  });
};
