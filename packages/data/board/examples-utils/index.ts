import faker from '@faker-js/faker';
import { colors } from '@uidu/theme';
import { Author, ItemMapProps, ItemProps } from '../src/types';

const jake: Author = {
  id: '1',
  name: 'Jake',
  url: 'http://adventuretime.wikia.com/wiki/Jake',
  avatarUrl: `https://api.adorable.io/avatars/80/${faker.internet.email()}.png`,
  colors: {
    soft: colors.Y50,
    hard: colors.Y200,
  },
};

const BMO: Author = {
  id: '2',
  name: 'BMO',
  url: 'http://adventuretime.wikia.com/wiki/BMO',
  avatarUrl: `https://api.adorable.io/avatars/80/${faker.internet.email()}.png`,
  colors: {
    soft: colors.G50,
    hard: colors.G200,
  },
};

const finn: Author = {
  id: '3',
  name: 'Finn',
  url: 'http://adventuretime.wikia.com/wiki/Finn',
  avatarUrl: `https://api.adorable.io/avatars/80/${faker.internet.email()}.png`,
  colors: {
    soft: colors.B50,
    hard: colors.B200,
  },
};

const princess: Author = {
  id: '4',
  name: 'Princess bubblegum',
  url: 'http://adventuretime.wikia.com/wiki/Princess_Bubblegum',
  avatarUrl: `https://api.adorable.io/avatars/80/${faker.internet.email()}.png`,
  colors: {
    soft: colors.P50,
    hard: colors.P200,
  },
};

export const authors: Author[] = [jake, BMO, finn, princess];

export const items: ItemProps[] = [
  {
    id: '1',
    content: 'Sometimes life is scary and dark',
    data: {
      author: BMO,
    },
  },
  {
    id: '2',
    content:
      'Sucking at something is the first step towards being sorta good at something.',
    data: {
      author: jake,
    },
  },
  {
    id: '3',
    content: "You got to focus on what's real, man",
    data: {
      author: jake,
    },
  },
  {
    id: '4',
    content: 'Is that where creativity comes from? From sad biz?',
    data: {
      author: finn,
    },
  },
  {
    id: '5',
    content: 'Homies help homies. Always',
    data: {
      author: finn,
    },
  },
  {
    id: '6',
    content: 'Responsibility demands sacrifice',
    data: {
      author: princess,
    },
  },
  {
    id: '7',
    content: "That's it! The answer was so simple, I was too smart to see it!",
    data: {
      author: princess,
    },
  },
  {
    id: '8',
    content: 'People make mistakes. It’s a part of growing up',
    data: {
      author: finn,
    },
  },
  {
    id: '9',
    content: "Don't you always call sweatpants 'give up on life pants,' Jake?",
    data: {
      author: finn,
    },
  },
  {
    id: '10',
    content: 'I should not have drunk that much tea!',
    data: {
      author: princess,
    },
  },
  {
    id: '11',
    content: 'Please! I need the real you!',
    data: {
      author: princess,
    },
  },
  {
    id: '12',
    content: "Haven't slept for a solid 83 hours, but, yeah, I'm good.",
    data: {
      author: princess,
    },
  },
];

// So we do not have any clashes with our hardcoded ones
let idCount: number = items.length + 1;

export const getItems = (count: number): ItemProps[] =>
  Array.from({ length: count }, (v, k) => k).map(() => {
    const random: ItemProps = items[Math.floor(Math.random() * items.length)];

    const custom: ItemProps = {
      ...random,
      id: `G${idCount++}`,
    };

    return custom;
  });

export const getAuthors = (count: number): Author[] =>
  Array.from({ length: count }, (v, k) => k).map(() => {
    const random: Author = authors[Math.floor(Math.random() * authors.length)];

    const custom: Author = {
      ...random,
      id: `author-${idCount++}`,
    };

    return custom;
  });

const getByAuthor = (author: Author, items: ItemProps[]): ItemProps[] =>
  items.filter((item: ItemProps) => item.data.author === author);

export const authorItemMap: ItemMapProps = authors.reduce(
  (previous: ItemMapProps, author: Author) => ({
    ...previous,
    [author.name]: getByAuthor(author, items),
  }),
  {},
);

export const generateItemMap = (itemCount: number): ItemMapProps =>
  authors.reduce(
    (previous: ItemMapProps, author: Author) => ({
      ...previous,
      [author.name]: getItems(itemCount / authors.length),
    }),
    {},
  );
