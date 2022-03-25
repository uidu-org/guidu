import faker from '@faker-js/faker';

export const messagerFactory = () => ({
  ...faker.helpers.userCard(),
  avatar: {
    thumb: `https://api.adorable.io/avatars/80/${faker.internet.email()}.png`,
  },
});

export const messageFactory = () => ({
  messager: {
    ...faker.helpers.userCard(),
    avatar: {
      thumb: `https://api.adorable.io/avatars/80/${faker.internet.email()}.png`,
    },
  },
  body: faker.lorem.paragraphs(),
  createdAt: faker.date.past(),
});

export const messageLogFactory = () => ({
  messager: {
    ...faker.helpers.userCard(),
    avatar: {
      thumb: `https://api.adorable.io/avatars/80/${faker.internet.email()}.png`,
    },
  },
  body: faker.lorem.sentence(),
  createdAt: faker.date.past(),
});
