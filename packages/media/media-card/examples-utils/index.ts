import { faker } from '@faker-js/faker';
import { FileType } from '../../media-core/dist/uidu-media-core.cjs';

export const fakeImage = () => ({
  id: faker.datatype.uuid(),
  description: faker.lorem.sentence(),
  author: {
    avatar: faker.image.avatar(),
    name: faker.name.fullName(),
    email: faker.internet.email(),
  },
  file: {
    id: faker.datatype.uuid(),
    type: 'image' as FileType,
    url: faker.image.business(),
    metadata: {
      filename: faker.finance.accountName(),
      extension: 'jpg',
    },
  },
});

export const fakeVideo = () => ({
  id: faker.datatype.uuid(),
  description: faker.lorem.sentence(),
  author: {
    avatar: faker.image.avatar(),
    name: faker.name.fullName(),
  },
  createdAt: faker.date.recent(),
  file: {
    id: faker.datatype.uuid(),
    type: 'video' as FileType,
    url: 'https://peach.blender.org/wp-content/uploads/bbb-splash.png',
    metadata: {
      filename: faker.finance.accountName(),
      extension: 'mkv',
      sources: [
        {
          type: 'video/mp4',
          url: 'https://download.blender.org/peach/trailer/trailer_480p.mov',
        },
        {
          type: 'video/ogg',
          url: 'https://download.blender.org/peach/trailer/trailer_400p.ogg',
        },
      ],
    },
  },
});

export const fakeFile = () => ({
  id: faker.datatype.uuid(),
  description: faker.lorem.sentence(),
  author: {
    avatar: faker.image.avatar(),
    name: faker.name.fullName(),
  },
  createdAt: faker.date.recent(),
  file: {
    id: faker.datatype.uuid(),
    type: 'file' as FileType,
    url: faker.image.business(),
    metadata: {
      filename: faker.finance.accountName(),
      extension: 'pdf',
    },
  },
});

export const fakeLink = () => ({
  id: faker.datatype.uuid(),
  description: faker.lorem.sentence(),
  author: {
    avatar: faker.image.avatar(),
    name: faker.name.fullName(),
  },
  createdAt: faker.date.recent(),
  file: {
    id: faker.datatype.uuid(),
    type: 'link' as FileType,
    metadata: {
      url: faker.image.dataUri(),
      extension: 'png',
      filename: faker.finance.accountName(),
    },
  },
});

export const fetchAttachments = () => {
  return new Promise((resolve, reject) => {
    let wait = setTimeout(() => {
      clearTimeout(wait);
      resolve([
        ...Array.from(Array(1).keys()).map((i) => fakeImage()),
        ...Array.from(Array(1).keys()).map((i) => fakeVideo()),
        ...Array.from(Array(1).keys()).map((i) => fakeFile()),
        ...Array.from(Array(1).keys()).map((i) => fakeLink()),
      ]);
    }, 3000);
  });
};
