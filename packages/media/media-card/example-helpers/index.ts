import faker from 'faker';

export const fakeImage = () => ({
  kind: 'image',
  id: faker.random.uuid(),
  src: faker.image.business(),
  filename: faker.finance.accountName(),
  description: faker.lorem.sentence(),
  author: faker.helpers.userCard(),
  createdAt: faker.date.recent(),
  extension: 'jpg',
});

export const fakeVideo = () => ({
  kind: 'video',
  id: faker.random.uuid(),
  filename: faker.finance.accountName(),
  src: 'https://peach.blender.org/wp-content/uploads/bbb-splash.png',
  description: faker.lorem.sentence(),
  author: faker.helpers.userCard(),
  createdAt: faker.date.recent(),
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
});

export const fakeFile = () => ({
  kind: 'file',
  id: faker.random.uuid(),
  src: faker.image.business(),
  filename: faker.finance.accountName(),
  description: faker.lorem.sentence(),
  author: faker.helpers.userCard(),
  createdAt: faker.date.recent(),
  extension: 'pdf',
});

export const fakeLink = () => ({
  kind: 'link',
  id: faker.random.uuid(),
  src: faker.image.dataUri(),
  filename: faker.finance.accountName(),
  description: faker.lorem.sentence(),
  author: faker.helpers.userCard(),
  createdAt: faker.date.recent(),
  extension: 'png',
});

export const fetchAttachments = () => {
  return new Promise((resolve, reject) => {
    let wait = setTimeout(() => {
      clearTimeout(wait);
      resolve([
        ...Array.from(Array(1).keys()).map(i => fakeImage()),
        ...Array.from(Array(1).keys()).map(i => fakeVideo()),
        ...Array.from(Array(1).keys()).map(i => fakeFile()),
        ...Array.from(Array(1).keys()).map(i => fakeLink()),
      ]);
    }, 3000);
  });
};
