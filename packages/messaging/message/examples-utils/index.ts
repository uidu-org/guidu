import { faker } from '@faker-js/faker';

export const messagerFactory = () => ({
  name: faker.name.fullName(),
  email: faker.internet.email(),
  avatar: {
    thumb: `https://api.adorable.io/avatars/80/${faker.internet.email()}.png`,
  },
});

export const messageFactory = () => ({
  messager: {
    name: faker.name.fullName(),
    email: faker.internet.email(),
    avatar: {
      thumb: `https://api.adorable.io/avatars/80/${faker.internet.email()}.png`,
    },
  },
  body: faker.lorem.paragraphs(),
  createdAt: faker.date.past(),
});

export const messageLogFactory = () => ({
  messager: {
    name: faker.name.fullName(),
    email: faker.internet.email(),
    avatar: {
      thumb: `https://api.adorable.io/avatars/80/${faker.internet.email()}.png`,
    },
  },
  body: faker.lorem.sentence(),
  createdAt: faker.date.past(),
});
