import faker from 'faker';
import { FileType } from '../../media-core/dist/uidu-media-core.cjs';

export const fakeImage = () => ({
  id: faker.random.uuid(),
  description: faker.lorem.sentence(),
  author: faker.helpers.userCard(),
  file: {
    id: faker.random.uuid(),
    type: 'image' as FileType,
    url: faker.image.business(),
    metadata: {
      filename: faker.finance.accountName(),
      extension: 'jpg',
    },
  },
});

export const fakeVideo = () => ({
  id: faker.random.uuid(),
  description: faker.lorem.sentence(),
  author: faker.helpers.userCard(),
  createdAt: faker.date.recent(),
  file: {
    id: faker.random.uuid(),
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
  id: faker.random.uuid(),
  description: faker.lorem.sentence(),
  author: faker.helpers.userCard(),
  createdAt: faker.date.recent(),
  file: {
    id: faker.random.uuid(),
    type: 'file' as FileType,
    url: faker.image.business(),
    metadata: {
      filename: faker.finance.accountName(),
      extension: 'pdf',
    },
  },
});

export const fakeLink = () => ({
  id: faker.random.uuid(),
  description: faker.lorem.sentence(),
  author: faker.helpers.userCard(),
  createdAt: faker.date.recent(),
  file: {
    id: faker.random.uuid(),
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
