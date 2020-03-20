import faker from 'faker';
import moment from 'moment';

export const fetchMessages = (limit = 20, page, initial) => {
  return new Promise((resolve, reject) => {
    let wait = setTimeout(() => {
      clearTimeout(wait);
      resolve(
        Array.from(Array(limit).keys()).reduce((accumulator, index) => {
          const previuosMessage = accumulator[index + page * limit - 1];
          console.log(index + page * limit - 1);
          console.log(previuosMessage);
          accumulator.push({
            klass: 'Message',
            scope: 'messages',
            kind: 'message.create',
            id: faker.random.uuid(),
            uid: faker.random.uuid(),
            body: faker.random.boolean()
              ? faker.lorem.paragraph()
              : faker.lorem.words(),
            createdAt: previuosMessage
              ? moment(previuosMessage.createdAt)
                  .subtract(30, 'minutes')
                  .toISOString()
              : moment().toISOString(),
            updatedAt: faker.date.recent(),
            messager: {
              id: faker.random.boolean() ? 1306 : 1206,
              avatar: {
                thumb: faker.image.avatar(),
              },
            },
          });
          return accumulator;
        }, initial),
      );
    }, 3000);
  });
};
