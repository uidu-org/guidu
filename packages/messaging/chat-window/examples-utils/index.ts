import { faker } from '@faker-js/faker';
import { MessageProps } from '@uidu/message';
import moment from 'moment';

const fakeAttachments = () => {
  return Array.from(
    Array(faker.datatype.number({ min: 1, max: 4 })).keys(),
  ).map((i) => ({
    id: faker.datatype.uuid(),
    file: {
      id: faker.datatype.uuid(),
      url: faker.random.image(),
      type: faker.random.arrayElement(['file', 'image']),
      metadata: {
        filename: faker.random.words(),
        extension: faker.random.arrayElement([
          'jpg',
          'pdf',
          'docx',
          'xlsx',
          'sql',
        ]),
      },
    },
  }));
};

export const message: () => MessageProps = () => ({
  klass: 'Message',
  scope: 'messages',
  kind: 'message.create',
  id: faker.datatype.uuid(),
  uid: faker.datatype.uuid(),
  body: faker.random.boolean() ? faker.lorem.paragraph() : faker.lorem.words(),
  createdAt: moment().toDate(),
  updatedAt: faker.date.recent(),
  messager: {
    name: faker.name.fullName(),
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
