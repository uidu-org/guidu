import { faker } from '@faker-js/faker';
import { FileType } from '../../media-core/dist/uidu-media-core.cjs';

export const fakeImage = () => ({
  id: faker.string.uuid(),
  description: faker.lorem.sentence(),
  author: {
    avatar: faker.image.avatar(),
    name: faker.name.fullName(),
    email: faker.internet.email(),
  },
  file: {
    id: faker.string.uuid(),
    type: 'image' as FileType,
    url: faker.image.business(),
    metadata: {
      filename: faker.finance.accountName(),
      extension: 'jpg',
      mime_type: 'image/jpeg',
    },
  },
});

export const fakeVideo = () => ({
  id: faker.string.uuid(),
  description: faker.lorem.sentence(),
  author: {
    avatar: faker.image.avatar(),
    name: faker.name.fullName(),
  },
  createdAt: faker.date.recent(),
  file: {
    id: faker.string.uuid(),
    type: 'video' as FileType,
    url: 'https://peach.blender.org/wp-content/uploads/bbb-splash.png',
    metadata: {
      filename: faker.finance.accountName(),
      extension: 'mkv',
      // mime_type: 'image/jpeg',
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

export const fakePdf = () => ({
  id: faker.string.uuid(),
  description: faker.lorem.sentence(),
  author: {
    avatar: faker.image.avatar(),
    name: faker.name.fullName(),
  },
  createdAt: faker.date.recent(),
  file: {
    id: faker.string.uuid(),
    type: 'file' as FileType,
    url: 'https://arxiv.org/pdf/quant-ph/0410100.pdf',
    metadata: {
      filename: faker.finance.accountName(),
      extension: 'pdf',
      mime_type: 'application/pdf',
    },
  },
});

export const fakeXls = () => ({
  id: faker.string.uuid(),
  description: faker.lorem.sentence(),
  author: {
    avatar: faker.image.avatar(),
    name: faker.name.fullName(),
  },
  createdAt: faker.date.recent(),
  file: {
    id: faker.string.uuid(),
    type: 'file' as FileType,
    url: 'https://file-examples.com/wp-content/uploads/2017/02/file_example_XLS_100.xls',
    metadata: {
      filename: faker.finance.accountName(),
      extension: 'pdf',
      mime_type: 'xls',
    },
  },
});
export const fakeCsv = () => ({
  id: faker.string.uuid(),
  description: faker.lorem.sentence(),
  author: {
    avatar: faker.image.avatar(),
    name: faker.name.fullName(),
  },
  createdAt: faker.date.recent(),
  file: {
    id: faker.string.uuid(),
    type: 'file' as FileType,
    url: 'https://arxiv.org/pdf/quant-ph/0410100.pdf',
    metadata: {
      filename: faker.finance.accountName(),
      extension: 'pdf',
      mime_type: 'application/pdf',
    },
  },
});

export const fakeLink = () => ({
  id: faker.string.uuid(),
  description: faker.lorem.sentence(),
  author: {
    avatar: faker.image.avatar(),
    name: faker.name.fullName(),
  },
  createdAt: faker.date.recent(),
  file: {
    id: faker.string.uuid(),
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
        ...Array.from(Array(1).keys()).map((i) => fakePdf()),
        ...Array.from(Array(1).keys()).map((i) => fakeLink()),
        ...Array.from(Array(1).keys()).map((i) => fakeXls()),
      ]);
    }, 3000);
  });
};
